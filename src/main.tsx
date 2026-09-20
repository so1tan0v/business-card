import { createRoot } from 'react-dom/client';
import { createDependencies } from './infrastructure/composition/create-dependencies';
import { App } from './presentation/components/App';
import { DependenciesProvider } from './presentation/context/dependencies.context';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root was not found');
}

const dependencies = createDependencies();

createRoot(rootElement).render(
  <DependenciesProvider value={dependencies}>
    <App />
  </DependenciesProvider>
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW is optional for the static card
    });
  });
}
