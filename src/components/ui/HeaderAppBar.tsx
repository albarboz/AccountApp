import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useGoogleAuth } from '../../Context/GoogleContext';

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface HeaderAppBarProps {
    open: boolean;
    handleDrawerOpen: () => void;
    user?: string;
}

const HeaderAppBar: React.FC<HeaderAppBarProps> = ({ user, open, handleDrawerOpen }) => {
    const { signOutOfGoogle } = useGoogleAuth();

    return (
        <StyledAppBar position="fixed" open={open} sx={{ backgroundColor: '#1d1c1e' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 4,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Typography variant="h6" noWrap component="div" sx={{ color: 'white', fontWeight: 600 }}>
                    Accountant
                </Typography>
                {user && (
                    <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
                        <button
                            onClick={signOutOfGoogle}
                            className="sign-in-button"
                            style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', border: 'none', background: 'transparent', color: 'white' }}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default HeaderAppBar;
