import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { username, email, password } = form;
      await register({ username, email, password });
      toast.success('Account created! Welcome to PropSpace!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, label, type = 'text', icon: Icon, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required
          className="input-field pl-10"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-navy-900 rounded-2xl mb-4">
              <Building2 className="w-7 h-7 text-gold-400" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Create Your Account</h1>
            <p className="text-slate-500 mt-1 text-sm">Join PropSpace and start listing today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field name="username" label="Username" icon={User} placeholder="johndoe" />
            <Field name="email" label="Email Address" type="email" icon={Mail} placeholder="you@example.com" />
            <Field name="password" label="Password" type="password" icon={Lock} placeholder="Min. 6 characters" />
            <Field name="confirmPassword" label="Confirm Password" type="password" icon={Lock} placeholder="Re-enter password" />

            <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 text-base py-3 mt-2">
              <UserPlus className="w-4 h-4" />
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-navy-800 font-semibold hover:text-navy-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
