import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { usePlaidAuth } from '../../Context/PlaidContext';
import { usePlaidLink } from 'react-plaid-link';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import HeaderAppBar from './HeaderAppBar';
import AppRoutes from '../routes/AppRoutes';
import axios from 'axios';

export default function MiniDrawer({ user }: { user: any; signOut: () => void }) {
  const [open, setOpen] = useState<boolean>(false); // Added type annotation
  const { linkToken, isPlaidAuthenticated, setIsPlaidAuthenticated } = usePlaidAuth();

  



 
  const { open: plaidLinkOpen, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess: async (public_token, metadata) => {
      console.log('Plaid Link success', public_token, metadata);
      setIsPlaidAuthenticated(true); 
      await axios.post('/set-auth-cookie');
    }
  });


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <BrowserRouter>
      <Box>
        <HeaderAppBar user={user} open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <AppRoutes />
        {!isPlaidAuthenticated && (
          <button onClick={() => plaidLinkOpen()} disabled={!ready}>
            Connect a bank account
          </button>
        )}
      </Box>
    </BrowserRouter>
  );
}
