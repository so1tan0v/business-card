import { createRoot } from 'react-dom/client';
import { App } from './react/App';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(<App />);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
