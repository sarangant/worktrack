import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { loadPersistedAuth } from './state/auth';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

// Load persisted auth on app startup
loadPersistedAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </JotaiProvider>
  </StrictMode>,
);
