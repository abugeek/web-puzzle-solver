#!/usr/bin/env python3
"""
Universal Pattern Puzzle Solver - Truly Flexible Backend
Works with ANY pattern, ANY number of unknowns, ANY length
"""

from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS
import random
import json
import os
import itertools
from typing import List, Dict, Tuple
from datetime import datetime

app = Flask(__name__)

# Get secret key from environment or use random one
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24))

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5173",
            os.environ.get('FRONTEND_URL', '*')
        ],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})

PUZZLES_FILE = 'puzzles.json'

# Simple presets for demo
# Configuration
DEFAULT_PRESET_ID = 'us_area_code'

PRESETS = {
    'us_area_code': {
        'name': 'US Area Code',
        'description': 'Find missing area code in US phone number',
        'pattern': '+1{U1}5551234',
        'unknowns': [
            {
                'id': 'U1',
                'label': 'Area Code',
                'options': [
                    "212", "213", "310", "312", "323", "415", "510", "646", "718", "917"
                ]
            }
        ]
    }
}


def load_puzzles() -> Dict:
    """Load saved puzzles"""
    if os.path.exists(PUZZLES_FILE):
        try:
            with open(PUZZLES_FILE, 'r') as f:
                return json.load(f)
        except:
            pass
    return {}


def save_puzzles(puzzles: Dict):
    """Save puzzles"""
    try:
        with open(PUZZLES_FILE, 'w') as f:
            json.dump(puzzles, f, indent=2)
    except Exception as e:
        print(f"Error saving puzzles: {e}")


def get_current_puzzle():
    """Get current puzzle from session"""
    if 'current_puzzle' in session:
        return session['current_puzzle']

    # Load default preset
    puzzle = PRESETS[DEFAULT_PRESET_ID].copy()
    puzzle['id'] = DEFAULT_PRESET_ID
    puzzle['checked'] = []
    session['current_puzzle'] = puzzle
    return puzzle


def set_current_puzzle(puzzle_data: Dict):
    """Set current puzzle"""
    puzzle_data['checked'] = puzzle_data.get('checked', [])
    session['current_puzzle'] = puzzle_data
    session.modified = True


class UniversalPuzzleSolver:
    """Universal solver that works with any pattern"""

    @staticmethod
    def generate_all_combinations(pattern: str, unknowns: List[Dict]) -> List[Dict]:
        """
        Generate ALL possible combinations for a pattern
        Works with any number of unknowns of any length

        Args:
            pattern: Pattern string like "+998{U1}562{U2}"
            unknowns: List of unknown definitions with their options

        Returns:
            List of all possible combinations
        """
        # Extract unknown IDs and their options
        unknown_map = {u['id']: u['options'] for u in unknowns}
        unknown_ids = [u['id'] for u in unknowns]

        # Generate all combinations using itertools.product
        all_option_combinations = list(itertools.product(*[unknown_map[uid] for uid in unknown_ids]))

        combinations = []
        for combo in all_option_combinations:
            # Build the complete value by replacing each unknown
            result = pattern
            combination_key = {}

            for i, uid in enumerate(unknown_ids):
                result = result.replace('{' + uid + '}', combo[i])
                combination_key[uid] = combo[i]

            # Create a unique key for this combination
            combo_key = '|'.join([combination_key[uid] for uid in unknown_ids])

            combinations.append({
                'value': result,
                'combination': combination_key,
                'key': combo_key
            })

        return combinations

    @staticmethod
    def calculate_probabilities(total: int, checked: int) -> Dict:
        """Calculate probability statistics"""
        remaining = total - checked

        if remaining == 0:
            return {
                'total': total,
                'remaining': 0,
                'checked': checked,
                'probability_next': 0,
                'probability_within_3': 0,
                'probability_within_5': 0,
                'probability_within_10': 0,
                'expected_attempts': 0,
                'best_case': 0,
                'worst_case': 0
            }

        prob_next = (1 / remaining) * 100 if remaining > 0 else 0
        prob_within_3 = min((3 / remaining) * 100, 100) if remaining > 0 else 0
        prob_within_5 = min((5 / remaining) * 100, 100) if remaining > 0 else 0
        prob_within_10 = min((10 / remaining) * 100, 100) if remaining > 0 else 0
        expected = (remaining + 1) / 2

        return {
            'total': total,
            'remaining': remaining,
            'checked': checked,
            'probability_next': round(prob_next, 2),
            'probability_within_3': round(prob_within_3, 2),
            'probability_within_5': round(prob_within_5, 2),
            'probability_within_10': round(prob_within_10, 2),
            'expected_attempts': round(expected, 1),
            'best_case': 1,
            'worst_case': remaining
        }

    @staticmethod
    def get_optimal_strategy(puzzle: Dict) -> Dict:
        """Get optimal checking strategy"""
        checked = puzzle.get('checked', [])
        combinations = UniversalPuzzleSolver.generate_all_combinations(
            puzzle['pattern'],
            puzzle['unknowns']
        )

        # Filter unchecked
        remaining = [c for c in combinations if c['key'] not in checked]

        if not remaining:
            return {
                'strategy': 'exhausted',
                'recommended': [],
                'total_remaining': 0
            }

        # Sort and get middle-out order
        remaining_sorted = sorted(remaining, key=lambda x: x['key'])
        middle_out_order = []
        temp = remaining_sorted.copy()

        while temp:
            mid_idx = len(temp) // 2
            middle_out_order.append(temp.pop(mid_idx))

        # Get recommendations
        recommended = []
        for item in middle_out_order[:5]:
            recommended.append({
                'value': item['value'],
                'key': item['key'],
                'combination': item['combination']
            })

        return {
            'strategy': 'optimal',
            'recommended': recommended,
            'total_remaining': len(remaining)
        }


# ==================== API Routes ====================

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/presets')
def get_presets():
    """Get presets"""
    presets_list = []
    for key, preset in PRESETS.items():
        presets_list.append({
            'id': key,
            'name': preset['name'],
            'description': preset['description'],
            'pattern': preset['pattern'],
            'unknowns_count': len(preset['unknowns'])
        })
    return jsonify({'presets': presets_list})


@app.route('/api/preset/<preset_id>')
def load_preset(preset_id):
    """Load preset"""
    if preset_id in PRESETS:
        puzzle = PRESETS[preset_id].copy()
        puzzle['id'] = preset_id
        puzzle['checked'] = []
        set_current_puzzle(puzzle)
        return jsonify({'success': True, 'puzzle': puzzle})
    return jsonify({'success': False, 'error': 'Not found'}), 404


@app.route('/api/puzzle/create', methods=['POST'])
def create_custom_puzzle():
    """Create custom puzzle"""
    try:
        data = request.json

        # Validate
        if 'name' not in data or 'pattern' not in data or 'unknowns' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400

        if not data['unknowns']:
            return jsonify({'success': False, 'error': 'Must have at least one unknown'}), 400

        # Create puzzle
        puzzle = {
            'id': f"custom_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'name': data['name'],
            'description': data.get('description', ''),
            'pattern': data['pattern'],
            'unknowns': data['unknowns'],
            'checked': [],
            'created_at': datetime.now().isoformat()
        }

        # Save
        puzzles = load_puzzles()
        puzzles[puzzle['id']] = puzzle
        save_puzzles(puzzles)

        # Set as current
        set_current_puzzle(puzzle)

        return jsonify({'success': True, 'puzzle': puzzle})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400


@app.route('/api/puzzle/current')
def get_current_puzzle_info():
    """Get current puzzle"""
    puzzle = get_current_puzzle()

    # Create display pattern
    display_pattern = puzzle['pattern']
    for unknown in puzzle['unknowns']:
        # Replace with X's matching the length of first option
        if unknown['options']:
            x_count = len(unknown['options'][0])
            display_pattern = display_pattern.replace(
                '{' + unknown['id'] + '}',
                'X' * x_count
            )

    return jsonify({
        'puzzle': puzzle,
        'pattern_display': display_pattern
    })


@app.route('/api/puzzle/saved')
def get_saved_puzzles():
    """Get saved puzzles"""
    puzzles = load_puzzles()
    puzzle_list = []

    for puzzle_id, puzzle in puzzles.items():
        # Handle old format that doesn't have 'unknowns' field
        unknowns_count = len(puzzle.get('unknowns', []))

        puzzle_list.append({
            'id': puzzle_id,
            'name': puzzle['name'],
            'description': puzzle.get('description', ''),
            'pattern': puzzle['pattern'],
            'unknowns_count': unknowns_count,
            'created_at': puzzle.get('created_at', '')
        })

    return jsonify({'puzzles': puzzle_list})


@app.route('/api/puzzle/load/<puzzle_id>')
def load_saved_puzzle(puzzle_id):
    """Load saved puzzle"""
    puzzles = load_puzzles()

    if puzzle_id in puzzles:
        puzzle = puzzles[puzzle_id].copy()
        puzzle['checked'] = []
        set_current_puzzle(puzzle)
        return jsonify({'success': True, 'puzzle': puzzle})

    return jsonify({'success': False, 'error': 'Not found'}), 404


@app.route('/api/puzzle/delete/<puzzle_id>', methods=['DELETE'])
def delete_puzzle(puzzle_id):
    """Delete puzzle"""
    puzzles = load_puzzles()

    if puzzle_id in puzzles:
        del puzzles[puzzle_id]
        save_puzzles(puzzles)
        return jsonify({'success': True})

    return jsonify({'success': False}), 404


@app.route('/api/puzzle/update/<puzzle_id>', methods=['PUT'])
def update_puzzle(puzzle_id):
    """Update existing puzzle"""
    data = request.json
    puzzles = load_puzzles()

    if puzzle_id not in puzzles:
        return jsonify({'success': False, 'error': 'Puzzle not found'}), 404

    # Update puzzle data while preserving checked state
    existing_checked = puzzles[puzzle_id].get('checked', [])

    puzzles[puzzle_id].update({
        'name': data.get('name'),
        'description': data.get('description', ''),
        'pattern': data.get('pattern'),
        'unknowns': data.get('unknowns'),
        'checked': existing_checked  # Preserve checked state
    })

    save_puzzles(puzzles)

    # If this is the current puzzle, update it
    if CURRENT_PUZZLE_ID == puzzle_id:
        set_current_puzzle(puzzles[puzzle_id])

    return jsonify({'success': True, 'puzzle': puzzles[puzzle_id]})


@app.route('/api/combinations')
def get_combinations():
    """Get all combinations"""
    puzzle = get_current_puzzle()
    checked = puzzle.get('checked', [])

    combinations = UniversalPuzzleSolver.generate_all_combinations(
        puzzle['pattern'],
        puzzle['unknowns']
    )

    result = []
    for combo in combinations:
        result.append({
            'value': combo['value'],
            'key': combo['key'],
            'combination': combo['combination'],
            'checked': combo['key'] in checked
        })

    return jsonify({
        'combinations': result,
        'total': len(result)
    })


@app.route('/api/probabilities')
def get_probabilities():
    """Get probabilities"""
    puzzle = get_current_puzzle()

    # Calculate total combinations
    total = 1
    for unknown in puzzle['unknowns']:
        total *= len(unknown['options'])

    checked_count = len(puzzle.get('checked', []))

    stats = UniversalPuzzleSolver.calculate_probabilities(total, checked_count)
    return jsonify(stats)


@app.route('/api/strategy')
def get_strategy():
    """Get strategy"""
    puzzle = get_current_puzzle()
    strategy = UniversalPuzzleSolver.get_optimal_strategy(puzzle)
    return jsonify(strategy)


@app.route('/api/check', methods=['POST'])
def check_combination():
    """Mark combination as checked"""
    data = request.json
    key = data.get('key')

    puzzle = get_current_puzzle()
    checked = puzzle.get('checked', [])

    if key in checked:
        return jsonify({'success': False, 'message': 'Already checked'})

    checked.append(key)
    puzzle['checked'] = checked
    set_current_puzzle(puzzle)

    # Calculate total
    total = 1
    for unknown in puzzle['unknowns']:
        total *= len(unknown['options'])

    stats = UniversalPuzzleSolver.calculate_probabilities(total, len(checked))

    return jsonify({
        'success': True,
        'checked': checked,
        'stats': stats
    })


@app.route('/api/uncheck', methods=['POST'])
def uncheck_combination():
    """Unmark combination"""
    data = request.json
    key = data.get('key')

    puzzle = get_current_puzzle()
    checked = puzzle.get('checked', [])

    if key in checked:
        checked.remove(key)
        puzzle['checked'] = checked
        set_current_puzzle(puzzle)

    total = 1
    for unknown in puzzle['unknowns']:
        total *= len(unknown['options'])

    stats = UniversalPuzzleSolver.calculate_probabilities(total, len(checked))

    return jsonify({
        'success': True,
        'checked': checked,
        'stats': stats
    })


@app.route('/api/reset', methods=['POST'])
def reset():
    """Reset progress"""
    puzzle = get_current_puzzle()
    puzzle['checked'] = []
    set_current_puzzle(puzzle)

    total = 1
    for unknown in puzzle['unknowns']:
        total *= len(unknown['options'])

    stats = UniversalPuzzleSolver.calculate_probabilities(total, 0)

    return jsonify({
        'success': True,
        'stats': stats
    })


@app.route('/api/export')
def export_combinations():
    """Export combinations"""
    puzzle = get_current_puzzle()
    checked = puzzle.get('checked', [])

    combinations = UniversalPuzzleSolver.generate_all_combinations(
        puzzle['pattern'],
        puzzle['unknowns']
    )

    text = f"{puzzle['name']} - All Combinations\n"
    text += "=" * 60 + "\n\n"
    text += f"Pattern: {puzzle['pattern']}\n"
    text += f"Total combinations: {len(combinations)}\n\n"
    text += "All possible values:\n"
    text += "-" * 60 + "\n"

    for i, combo in enumerate(combinations, 1):
        status = "✗ Checked" if combo['key'] in checked else "✓ Unchecked"
        text += f"{i:4}. {combo['value']} {status}\n"

    text += "\n" + "=" * 60 + "\n"
    text += f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"

    return text, 200, {'Content-Type': 'text/plain; charset=utf-8'}


if __name__ == '__main__':
    print("\n" + "="*60)
    print("📱 Universal Pattern Puzzle Solver")
    print("="*60)
    print("\n🌐 Server: http://localhost:50000")
    print("   Press Ctrl+C to stop\n")

    app.run(debug=True, host='0.0.0.0', port=50000)
