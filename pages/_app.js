import '../styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AuthProvider } from '../contexts/AuthContext';
import { StoreProvider } from '../utils/Store';

export default function App({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <AuthProvider>
      <UserProvider  user={user}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </UserProvider>
    </AuthProvider>
  );
}
