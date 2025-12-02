import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, 
  Save, X, Sparkles, Shield, Heart, ShoppingBag
} from 'lucide-react';
import AxiosInstance from '../../AxiosInstance/call_api';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await AxiosInstance.get('customers/profile/');
        setProfileData(response.data);
        setEditedData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, []);

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await AxiosInstance.put('customers/profile/', editedData);
      setProfileData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile not found</h2>
          <p className="text-slate-600">Unable to load profile data.</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
              <p className="text-slate-600">Manage your account information</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Quick Stats */}
          <motion.div
            {...fadeInUp}
            className="lg:col-span-1 space-y-6"
          >
            {/* Avatar Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block mb-4"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <User className="w-16 h-16 text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center"
                >
                  <Shield className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {profileData.first_name} {profileData.last_name}
              </h2>
              <p className="text-sm text-slate-500 mb-4">Customer ID: #{profileData.id}</p>
              
              {!isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition font-medium flex items-center justify-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </motion.button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Total Orders</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">24</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 bg-pink-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <span className="text-sm font-medium text-slate-700">Wishlist</span>
                  </div>
                  <span className="text-lg font-bold text-pink-600">12</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="first_name"
                      value={isEditing ? editedData.first_name : profileData.first_name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                        isEditing
                          ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Last Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="last_name"
                      value={isEditing ? editedData.last_name : profileData.last_name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                        isEditing
                          ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone_number"
                      value={isEditing ? editedData.phone_number : profileData.phone_number}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                        isEditing
                          ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={isEditing ? editedData.date_of_birth : profileData.date_of_birth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                        isEditing
                          ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Address - Full Width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="md:col-span-2"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <textarea
                      name="address"
                      value={isEditing ? editedData.address : profileData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition resize-none ${
                        isEditing
                          ? 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Account Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-slate-200"
              >
                <h4 className="text-lg font-bold text-slate-900 mb-4">Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">User ID</p>
                    <p className="text-lg font-semibold text-slate-900">#{profileData.user}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Account Status</p>
                    <p className="text-lg font-semibold text-green-600 flex items-center">
                      <Shield className="w-5 h-5 mr-1" />
                      Verified
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;