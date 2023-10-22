// AppRoutes.js
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import AssetsPage from './AssetsPage';
import GoalsPage from './GoalsPage';

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/assets" element={<AssetsPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/" element={<DashboardPage />} /> {/* Default route */}
            </Routes>
        </>
    );
}