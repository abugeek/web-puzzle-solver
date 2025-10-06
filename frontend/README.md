# Puzzle Solver Frontend (React + TypeScript)

Modern, modular React application built with TypeScript, Vite, and Zustand.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Card, etc.)
│   │   └── layout/       # Layout components
│   ├── features/         # Feature modules
│   │   ├── solver/       # Puzzle solving interface
│   │   ├── creator/      # Puzzle creation
│   │   ├── presets/      # Preset puzzles
│   │   └── saved/        # Saved puzzles management
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   │   └── api.ts        # Backend API client
│   ├── store/            # State management (Zustand)
│   │   └── puzzleStore.ts
│   ├── types/            # TypeScript definitions
│   │   └── puzzle.ts
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles & CSS variables
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Runs on http://localhost:3000 with API proxy to http://localhost:50000

### Build for Production
```bash
npm run build
```
Outputs to `../static/dist` for Flask to serve

### Preview Production Build
```bash
npm run preview
```

## 🎨 Design System

All design tokens are centralized in `src/styles/variables.css`:
- Color palette
- Spacing scale
- Typography
- Shadows
- Border radius
- Transitions

## 📦 State Management

Uses **Zustand** for lightweight, simple state management:
- No boilerplate
- TypeScript support
- Easy to test
- Better performance than Context API

## 🔌 API Layer

Centralized in `src/services/api.ts`:
- Axios-based HTTP client
- Type-safe API calls
- Error handling
- Easy to mock for testing

## 🧩 Component Architecture

### UI Components (`src/components/ui/`)
Reusable, prop-driven components:
- Button
- Card
- Input
- Modal
- Alert
etc.

### Feature Modules (`src/features/`)
Self-contained feature directories with:
- Components specific to the feature
- Feature-specific hooks
- Local state if needed

## 📝 TypeScript

Fully typed application:
- Type-safe props
- API response types
- Store types
- Autocomplete support

## 🎯 Key Technologies

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type safety
- **Vite** - Lightning-fast dev server & build tool
- **Zustand** - Minimal state management
- **Axios** - HTTP client
- **CSS Modules** - Scoped styling

## 🔧 Development Tips

1. **Adding a new component:**
   - Create component file in `src/components/ui/`
   - Create corresponding `.css` file
   - Export from `src/components/ui/index.ts`

2. **Adding a new feature:**
   - Create folder in `src/features/`
   - Build feature-specific components
   - Connect to store if needed

3. **API Integration:**
   - Add new endpoint in `src/services/api.ts`
   - Update types in `src/types/puzzle.ts`
   - Use in components via Zustand store

## 🚀 Performance

- Code splitting with dynamic imports
- Lazy loading for routes
- Optimized bundle size
- Fast refresh in development
- Production builds minified & optimized

## 📚 Next Steps

To complete the migration:
1. ✅ Core setup done
2. ⏳ Build feature modules (Solver, Creator, Presets, Saved)
3. ⏳ Create remaining UI components
4. ⏳ Add routing (React Router)
5. ⏳ Add error boundaries
6. ⏳ Add loading states
7. ⏳ Add tests
8. ⏳ Optimize performance

