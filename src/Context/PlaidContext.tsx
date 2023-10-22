import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type PlaidContextType = {
    isPlaidAuthenticated: boolean;
    linkToken: string | undefined;
    setIsPlaidAuthenticated: (value: boolean) => void;
};


const PlaidAuthContext = createContext<PlaidContextType | undefined>(undefined);


function PlaidAuthProvider({ children }: { children: React.ReactNode }) {
    const [isPlaidAuthenticated, setIsPlaidAuthenticated] = useState<boolean>(false);
    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);



    useEffect(() => {
        // Check server-side Plaid authentication status.
        async function checkPlaidAuthentication() {
          try {
            const response = await axios.get('/check-authentication');
            if (response.data.isPlaidAuthenticated) {
              setIsPlaidAuthenticated(true);
            } else {
              setIsPlaidAuthenticated(false);
            }
          } catch (error) {
            console.error("Error checking authentication", error);
          }
        }
    
        checkPlaidAuthentication();
    }, []);



    useEffect(() => {
        // Fetch Plaid Link token.
        async function fetchLinkToken() {
          try {
            const response = await axios.post('/link/token/create');
            if (response.data.linkToken) {
              setLinkToken(response.data.linkToken);
            }
          } catch (error) {
            console.error("error fetching link token", error);
          }
        }
    
        fetchLinkToken();
      }, []);





      console.log("isAuthenticated:", localStorage.getItem('isAuthenticated'));
      console.log("isPlaidAuthenticated:", localStorage.getItem('isPlaidAuthenticated'));
      console.log('isPlaidAuthenticated state:', isPlaidAuthenticated);




    return (
        <PlaidAuthContext.Provider value={{ isPlaidAuthenticated, linkToken, setIsPlaidAuthenticated}}>
            {children}
        </PlaidAuthContext.Provider>
    );

}


const usePlaidAuth = () => {
    const context = useContext(PlaidAuthContext);
    if (!context) {
        throw new Error('usePlaidAuth must be used within a PlaidAuthProvider');
    }
    return context;
};

export { PlaidAuthContext, PlaidAuthProvider, usePlaidAuth };