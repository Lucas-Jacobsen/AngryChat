import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ClerkProvider publishableKey={"pk_test_Y29vbC1yZWRiaXJkLTkwLmNsZXJrLmFjY291bnRzLmRldiQ"}>
      <App />
    </ClerkProvider>
);

