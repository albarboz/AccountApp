import React from 'react';
import './App.css';
import MiniDrawer from './components/ui/MiniDrawer';
import axios from 'axios'; // Import Axios
import { useGoogleAuth } from './Context/GoogleContext';

axios.defaults.baseURL = 'http://localhost:8000/'

const App: React.FC = () => {
  const { user, isLoading, isAuthenticated, signInWithGoogle, signOutOfGoogle } = useGoogleAuth();


  return (
    <>
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
            <MiniDrawer user={user} signOut={signOutOfGoogle} />
        ) : (
          <button onClick={signInWithGoogle}>Accountant Sign In</button>
          )}
      </div>
    </>
  );
};

export default App;



