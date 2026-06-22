import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import CreateProperty from './pages/CreateProperty';
import EditProperty from './pages/EditProperty';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties/new" element={<CreateProperty />} />
            <Route path="/properties/:id/edit" element={<EditProperty />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <footer className="bg-navy-900 text-slate-400 text-center py-6 text-sm">
        <p>© 2024 <span className="text-gold-400 font-semibold">PropSpace</span> — Find Your Perfect Property</p>
      </footer>
    </div>
  );
}
