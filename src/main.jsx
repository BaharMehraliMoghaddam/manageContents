import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ContentProvider from './ContentContext.jsx';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <App />
      </ContentProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);