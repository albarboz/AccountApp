import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import { usePlaidAuth } from './PlaidContext';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type GoogleContextType = {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signOutOfGoogle: () => void;
  setIsPlaidAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<GoogleContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsPlaidAuthenticated } = usePlaidAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsAuthenticated(!!authUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  }


  const signOutOfGoogle = () => {
    try {
      firebaseSignOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setIsPlaidAuthenticated(false);
      axios.post('/clear-auth-cookie');
    } catch (error) {
      console.error('Error signing out of Google', error);
    }
  }


  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, signInWithGoogle, signOutOfGoogle, setIsPlaidAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider };
