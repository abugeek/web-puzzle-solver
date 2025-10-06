import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from './i18n'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
)
