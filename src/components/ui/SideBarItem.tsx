import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import SidebarIcons from './SidebarIcons';




const SidebarItem: React.FC<{ text: string; open: boolean }> = ({ text, open }) => (
    <ListItem disablePadding>
        <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'white',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'blue',
                        color: 'white',
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'gold',
                    }}
                >
                    <SidebarIcons text={text} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </Link>
    </ListItem>
);


export default SidebarItem