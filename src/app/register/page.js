'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const TIME_SLOTS = {
  MORNING: "6:00-14:00",
  AFTERNOON: "14:00-22:00",
  NIGHT: "22:00-6:00"
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Patient specific fields
  const [emergencyContact, setEmergencyContact] = useState('');
  const [address, setAddress] = useState('');
  
  // Ambulance driver specific fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [availabilitySlot, setAvailabilitySlot] = useState(TIME_SLOTS.MORNING);

  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const validateCommonFields = () => {
    if (!email || !password || !name || !confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handlePatientRegistration = async () => {
    // if (!emergencyContact || !address) {
    //   setError('Emergency contact and address are required');
    //   return;
    // }

    // if (!emergencyContact.match(/^\d{10}$/)) {
    //   setError('Emergency contact must be a 10-digit number');
    //   return;
    // }
    // console.log(pinCode);
    // if (!(pinCode.trim().length == 6)) {
    //   setError('Please enter a valid pin code');
    //   return;
    // }

    // if (address.trim().length < 10) {
    //   setError('Please enter a complete address');
    //   return;
    // }



    return register(email, password, name, 'patient', {
      emergencyContact,
      pinCode,
      address
    });
  };

  const handleDriverRegistration = async () => {
    if (!licenseNumber || !vehicleNumber || !pinCode || !availabilitySlot) {
      setError('All driver details are required');
      return;
    }

    // if (!pinCode.match(/^\d{6}$/)) {
    //   setError('Pin code must be 6 digits');
    //   return;
    // }

    // if (!licenseNumber.trim()) {
    //   setError('Please enter a valid license number');
    //   return;
    // }

    // if (!vehicleNumber.trim()) {
    //   setError('Please enter a valid vehicle number');
    //   return;
    // }

    return register(email, password, name, 'ambulance_driver', {
      licenseNumber,
      vehicleNumber,
      pinCode,
      availabilitySlot
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateCommonFields()) {
      return;
    }

    try {
      const registrationHandler = role === 'patient' 
        ? handlePatientRegistration 
        : handleDriverRegistration;

      await registrationHandler();

    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="ambulance_driver">Ambulance Driver</option>
            </select>
          </div>

          {/* Common fields */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="8"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="8"
            />
          </div>

          {/* Patient Specific Fields */}
          {role === 'patient' && (
            <>
              <div>
                <label htmlFor="emergency-contact" className="block text-gray-700 text-sm font-bold mb-2">
                  Emergency Contact Number
                </label>
                <input
                  type="tel"
                  id="emergency-contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter your 6-digit pincode"
                />
              </div>


              <div>
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  rows="3"
                  placeholder="Enter your full address"
                />
              </div>
            </>
          )}

          {/* Ambulance Driver Specific Fields */}
          {role === 'ambulance_driver' && (
            <>
              <div>
                <label htmlFor="license-number" className="block text-gray-700 text-sm font-bold mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  id="license-number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="vehicle-number" className="block text-gray-700 text-sm font-bold mb-2">
                  Ambulance Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicle-number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="pin-code" className="block text-gray-700 text-sm font-bold mb-2">
                  Service Area Pin Code
                </label>
                <input
                  type="text"
                  id="pin-code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[0-9]{6}"
                  placeholder="6-digit pin code"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Availability Slot
                </label>
                <select
                  value={availabilitySlot}
                  onChange={(e) => setAvailabilitySlot(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={TIME_SLOTS.MORNING}>Morning (6:00 AM - 2:00 PM)</option>
                  <option value={TIME_SLOTS.AFTERNOON}>Afternoon (2:00 PM - 10:00 PM)</option>
                  <option value={TIME_SLOTS.NIGHT}>Night (10:00 PM - 6:00 AM)</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}