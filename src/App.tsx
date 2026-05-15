import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import H5Layout from './components/H5Layout';
import PlaceholderPage from './pages/PlaceholderPage';
import Login from './pages/Login';
import H5Login from './pages/h5/Login';
import Stats from './pages/h5/Stats';
import Events from './pages/h5/Events';
import Profile from './pages/h5/Profile';
import Dashboard from './pages/Dashboard';
import ReservoirManagement from './pages/business/ReservoirManagement';
import InsuranceManagement from './pages/business/InsuranceManagement';
import WarningManagement from './pages/risk/WarningManagement';
import ClaimsCalculator from './pages/risk/ClaimsCalculator';
import ClaimsRecords from './pages/risk/ClaimsRecords';
import Realtime from './pages/monitoring/Realtime';
import County from './pages/monitoring/County';
import Devices from './pages/ops/Devices';
import RiskReduction from './pages/ops/RiskReduction';
import PreDischarge from './pages/ops/PreDischarge';
import Drought from './pages/ops/Drought';
import Account from './pages/system/Account';
import Role from './pages/system/Role';
import Org from './pages/system/Org';
import Config from './pages/system/Config';
import Menu from './pages/system/Menu';
import LoginLog from './pages/system/LoginLog';
import OperationLog from './pages/system/OperationLog';
import SmsLog from './pages/system/SmsLog';
import H5ClaimsCalculator from './pages/h5/H5ClaimsCalculator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/h5/login" element={<H5Login />} />
        
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
          <Route path="/ops/devices" element={<Devices />} />
          <Route path="/ops/risk-reduction" element={<RiskReduction />} />
          <Route path="/ops/pre-discharge" element={<PreDischarge />} />
          <Route path="/ops/drought" element={<Drought />} />
          <Route path="/ops/*" element={<PlaceholderPage />} />
          <Route path="/system/account" element={<Account />} />
          <Route path="/system/role" element={<Role />} />
          <Route path="/system/org" element={<Org />} />
          <Route path="/system/config" element={<Config />} />
          <Route path="/system/menu" element={<Menu />} />
          <Route path="/system/log/login" element={<LoginLog />} />
          <Route path="/system/log/operation" element={<OperationLog />} />
          <Route path="/system/log/sms" element={<SmsLog />} />
          <Route path="/system/*" element={<PlaceholderPage />} />
        </Route>

        {/* H5 Routes */}
        <Route element={<H5Layout />}>
          <Route path="/h5/stats" element={<Stats />} />
          <Route path="/h5/events" element={<Events />} />
          <Route path="/h5/profile" element={<Profile />} />
        </Route>
        <Route path="/h5/claims/calculator" element={<H5ClaimsCalculator />} />

      </Routes>
    </BrowserRouter>
  );
}
