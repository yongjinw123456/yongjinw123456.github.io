import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import H5Layout from './components/H5Layout';
import PlaceholderPage from './pages/PlaceholderPage';
import H5PlaceholderPage from './pages/H5PlaceholderPage';
import Dashboard from './pages/Dashboard';
import ReservoirManagement from './pages/business/ReservoirManagement';
import InsuranceManagement from './pages/business/InsuranceManagement';
import WarningManagement from './pages/risk/WarningManagement';
import ClaimsCalculator from './pages/risk/ClaimsCalculator';
import ClaimsRecords from './pages/risk/ClaimsRecords';
import Realtime from './pages/monitoring/Realtime';
import County from './pages/monitoring/County';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Core Backend Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business/reservoir" element={<ReservoirManagement />} />
          <Route path="/business/insurance" element={<InsuranceManagement />} />
          <Route path="/business/*" element={<PlaceholderPage />} />
          <Route path="/risk/warning" element={<WarningManagement />} />
          <Route path="/risk/claims/calculator" element={<ClaimsCalculator />} />
          <Route path="/risk/claims/records" element={<ClaimsRecords />} />
          <Route path="/risk/*" element={<PlaceholderPage />} />
          <Route path="/monitoring/realtime" element={<Realtime />} />
          <Route path="/monitoring/county" element={<County />} />
          <Route path="/monitoring/*" element={<PlaceholderPage />} />
          <Route path="/ops/*" element={<PlaceholderPage />} />
          <Route path="/system/*" element={<PlaceholderPage />} />
        </Route>

        {/* H5 Routes */}
        <Route element={<H5Layout />}>
          <Route path="/h5/stats" element={<H5PlaceholderPage />} />
          <Route path="/h5/events" element={<H5PlaceholderPage />} />
          <Route path="/h5/profile" element={<H5PlaceholderPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
