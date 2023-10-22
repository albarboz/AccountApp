import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlagIcon from '@mui/icons-material/Flag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/MoveToInbox';



const SidebarIcons: React.FC<{ text: string }> = ({ text }) => {
    const textToIcon: Record<string, React.ReactElement> = {
        Dashboard: <DashboardIcon />,
        Assets: <AccountBalanceIcon />,
        Goals: <FlagIcon />,
    };

    return textToIcon[text] || <InboxIcon />;
};

export default SidebarIcons