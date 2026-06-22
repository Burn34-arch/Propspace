import { useState } from 'react';
import { User, Phone, Image, Lock, Save, ShieldCheck } from 'lucide-react';
import { updateProfile, changePassword } from '../api/user.api';
import { useAuth } from '../context/AuthContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '', newPassword: '', confirmNewPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileChange = (e) =>
    setProfileForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePasswordChange = (e) =>
    setPasswordForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await updateProfile(profileForm);
      updateUser(res.data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed successfully!');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your profile and security preferences</p>
      </div>

      {/* Avatar Preview */}
      <div className="card p-6 mb-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-navy-100 flex-shrink-0">
          {profileForm.avatar ? (
            <img
              src={profileForm.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <ImagePlaceholder
            className={`w-full h-full rounded-full ${profileForm.avatar ? 'hidden' : 'flex'}`}
            label=""
          />
        </div>
        <div>
          <p className="text-xl font-bold text-navy-900">{user?.name || user?.username}</p>
          <p className="text-slate-400 text-sm">@{user?.username}</p>
          <p className="text-slate-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-navy-800">Personal Information</h2>
        </div>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder="Your full name"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder="+1 (555) 000-0000"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Avatar Image URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="avatar"
                type="url"
                value={profileForm.avatar}
                onChange={handleProfileChange}
                placeholder="https://example.com/your-photo.jpg"
                className="input-field pl-10"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">Paste a link to your profile picture</p>
          </div>

          <button type="submit" disabled={savingProfile}
            className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            {savingProfile ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>

      {/* Password Form */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-5 h-5 text-gold-500" />
          <h2 className="text-lg font-semibold text-navy-800">Change Password</h2>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="oldPassword"
                type="password"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Min. 6 characters"
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="confirmNewPassword"
                type="password"
                value={passwordForm.confirmNewPassword}
                onChange={handlePasswordChange}
                placeholder="Re-enter new password"
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <button type="submit" disabled={savingPassword}
            className="btn-gold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
