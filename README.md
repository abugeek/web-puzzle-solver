# 📱 Universal Pattern Puzzle Solver - MVP

A modern, production-ready web application for solving pattern-based puzzles using probability optimization. Built with React 18, TypeScript, and Flask.

## 🚀 Features

- **Smart Solver**: Optimal probability-based strategy for finding unknown patterns
- **Custom Puzzles**: Create puzzles with visual pattern builder
- **Real-time Analytics**: Live probability calculations and success predictions
- **Preset Templates**: Quick-start with pre-configured puzzle templates
- **Puzzle Management**: Save, load, edit, and delete custom puzzles
- **Responsive UI**: Modern, mobile-friendly interface with smooth animations

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for ultra-fast development and optimized builds
- **Zustand** for lightweight state management
- **Axios** for API communication
- **CSS Variables** for consistent theming
- **Modular Design**: 20+ focused files for maintainability

### Backend
- **Flask** for RESTful API
- **Session-based** state management
- **JSON storage** for puzzle persistence
- **Probability algorithms** for optimal solving strategy

## 📦 Project Structure

```
web-puzzle-solver/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/ui/   # Reusable UI components
│   │   ├── features/        # Feature modules
│   │   │   ├── solver/      # Solver interface
│   │   │   ├── creator/     # Puzzle creator
│   │   │   ├── presets/     # Preset loader
│   │   │   └── saved/       # Saved puzzles
│   │   ├── services/        # API layer
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   ├── config/          # Constants
│   │   └── styles/          # Global styles
│   └── package.json
├── app.py                    # Flask backend
├── solver.py                 # Solving algorithm
└── puzzles.json              # Puzzle database
```

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 18+

### Backend Setup
```bash
# Install Python dependencies
pip install flask flask-cors

# Start Flask server
python app.py
# Server runs on http://localhost:50000
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:3000

# Build for production
npm run build
```

## 🎯 Usage

### 1. Solve a Puzzle
- Load preset or create custom puzzle
- View probability analytics and recommendations
- Click recommended numbers to mark as checked
- Track progress with real-time statistics

### 2. Create Custom Puzzle
- Build pattern with visual builder (text + unknown parts)
- Generate options via:
  - **Range**: Number range with optional padding
  - **List**: Comma-separated values
  - **Paste**: One value per line
- Delete individual options if needed
- Save and start solving

### 3. Manage Puzzles
- **Load**: Switch to saved puzzle and start solving
- **Edit**: Modify pattern, options, or name
- **Delete**: Remove unwanted puzzles

## 🔧 Configuration

### Frontend Constants (`frontend/src/config/constants.ts`)
```typescript
export const FORM = {
  DEFAULT_RANGE: { FROM: '100', TO: '200' },
  UNKNOWN_ID_PREFIX: 'U',
};

export const LIMITS = {
  PREVIEW_OPTIONS: 20,
};

export const MESSAGES = {
  SUCCESS: {
    PUZZLE_CREATED: (name) => `✅ Puzzle created: ${name}`,
  },
  // ... more messages
};
```

### Backend Configuration (`app.py`)
```python
DEFAULT_PRESET_ID = 'us_area_code'
PUZZLES_FILE = 'puzzles.json'

PRESETS = {
    'us_area_code': {
        'name': 'US Area Code',
        'pattern': '+1{U1}5551234',
        'unknowns': [...]
    }
}
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/puzzle/current` | Get current puzzle |
| POST | `/api/puzzle/create` | Create new puzzle |
| PUT | `/api/puzzle/update/:id` | Update puzzle |
| DELETE | `/api/puzzle/delete/:id` | Delete puzzle |
| GET | `/api/puzzle/saved` | List saved puzzles |
| GET | `/api/presets` | List presets |
| GET | `/api/probabilities` | Get stats |
| GET | `/api/strategy` | Get optimal strategy |
| POST | `/api/check` | Mark as checked |
| POST | `/api/reset` | Reset progress |

## 🧪 Development

### Code Quality
- TypeScript strict mode
- Centralized constants (no magic numbers)
- Modular architecture
- Type-safe API calls
- Reusable components

### Key Features
1. **Individual Option Deletion**: Remove specific options when creating puzzles
2. **Puzzle Editing**: Full edit capability for saved puzzles
3. **Tab-based Navigation**: Clean UI with 4 main tabs
4. **Real-time Updates**: Hot module replacement (HMR)
5. **Centralized Config**: Easy customization via constants

## 🌐 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Serve with Flask
```bash
# Flask serves built frontend automatically
python app.py
```

### Environment Variables
```bash
export FLASK_ENV=production
export SECRET_KEY=your-secret-key
export PORT=50000
```

## 🎨 Customization

### Adding Presets
Edit `app.py`:
```python
PRESETS = {
    'my_preset': {
        'name': 'My Preset',
        'description': 'Description',
        'pattern': '+1{U1}5551234',
        'unknowns': [
            {
                'id': 'U1',
                'label': 'Area Code',
                'options': ["212", "213"]
            }
        ]
    }
}
```

### Customizing UI
- **Constants**: `frontend/src/config/constants.ts`
- **Colors**: `frontend/src/styles/variables.css`
- **Messages**: Centralized in constants file

## 📝 MVP Features Checklist

- ✅ Solve puzzles with optimal strategy
- ✅ Create custom puzzles with visual builder
- ✅ Load preset templates
- ✅ Save/load/delete puzzles
- ✅ Edit existing puzzles
- ✅ Individual option deletion
- ✅ Real-time probability analytics
- ✅ Mobile-responsive design
- ✅ Type-safe codebase
- ✅ Production-ready architecture
- ✅ Centralized configuration
- ✅ Clean, maintainable code

## 🎯 What's New in MVP

1. **Removed Hardcoded Values**: All strings, numbers, and messages in centralized constants
2. **Single Preset**: Simplified to US Area Code only for MVP
3. **Enhanced Creator**: Added individual option deletion feature
4. **Full Edit Support**: Complete puzzle editing functionality
5. **Production Ready**: Optimized, clean codebase

## 📱 Responsive Design

Works on all devices:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🔒 Security & Privacy

- Local data storage
- No external tracking
- Session-based state
- Open source

## 📧 Support

For issues, create an issue on GitHub.

---

**Built with ❤️ using React 18, TypeScript, and Flask**

**Ready for Production MVP Deployment** 🚀
