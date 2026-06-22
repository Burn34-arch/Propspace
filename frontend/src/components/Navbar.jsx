import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, User, LayoutDashboard, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const navLink = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-gold-400' : 'text-slate-300 hover:text-white'}`;

  return (
    <nav className="bg-navy-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="bg-gold-500 p-1.5 rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Prop<span className="text-gold-400">Space</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLink}>Browse</NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>
                <NavLink to="/properties/new" className={navLink}>
                  <span className="flex items-center gap-1"><PlusCircle className="w-4 h-4" /> List Property</span>
                </NavLink>
                <NavLink to="/profile" className={navLink}>Profile</NavLink>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <div className="flex items-center gap-2 ml-2 pl-4 border-l border-navy-700">
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm">{user.username}</span>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLink}>Login</NavLink>
                <Link to="/register" className="btn-gold text-sm py-2 px-4">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-4 space-y-3">
          <NavLink to="/" end className="block text-slate-300 hover:text-white font-medium py-2" onClick={() => setMenuOpen(false)}>Browse</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white font-medium py-2" onClick={() => setMenuOpen(false)}><LayoutDashboard className="w-4 h-4" /> Dashboard</NavLink>
              <NavLink to="/properties/new" className="flex items-center gap-2 text-slate-300 hover:text-white font-medium py-2" onClick={() => setMenuOpen(false)}><PlusCircle className="w-4 h-4" /> List Property</NavLink>
              <NavLink to="/profile" className="flex items-center gap-2 text-slate-300 hover:text-white font-medium py-2" onClick={() => setMenuOpen(false)}><User className="w-4 h-4" /> Profile</NavLink>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-medium py-2 w-full"><LogOut className="w-4 h-4" /> Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="block text-slate-300 hover:text-white font-medium py-2" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <Link to="/register" className="block btn-gold text-center py-2" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
