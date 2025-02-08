import { Client, Account, ID, Databases } from 'appwrite';

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const authService = {

  async testFunction(name, age) {
    try {
      const promise = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        "67a677d000146ea26d2b",
        ID.unique(),
        {
          name: name,
          age: age
        }
      )

      promise.then((res) => { console.log(res) })
    } catch (error) {
      console.error('Test error:', error);
      throw error;
    }
  },


  async register(email, password, name, role, additionalDetails = {}) {
    try {
      // Create Appwrite account
      const userAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
        name
      );
      
      // Prepare base user profile data
      const baseProfileData = {
        userId: userAccount.$id,
        name,
        email,
      };
      
      // Add role-specific data
      let userProfileData;

      if (role === 'patient') {
        userProfileData = {
          ...baseProfileData,
          emergencyContact: additionalDetails.emergencyContact,
          pinCode: additionalDetails.pinCode,
          address: additionalDetails.address, // Add address field
        };

        console.log(userProfileData);
        
        const user = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID,
          userAccount.$id,
          userProfileData
        );

        console.log(user);
        
      } else if (role === 'ambulance_driver') {
        userProfileData = {
          ...baseProfileData,
          licenseNumber: additionalDetails.licenseNumber,
          vehicleNumber: additionalDetails.vehicleNumber,
          pinCode: additionalDetails.pinCode,
          availabilitySlot: additionalDetails.availabilitySlot,
        };

        console.log(userProfileData);

        const user = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_DRIVER_COLLECTION_ID,
          userAccount.$id,
          userProfileData
        );

        console.log("user"+user);
      }
      return userAccount;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Login with role validation and status check
  async login(email, password) {
    try {
      // Create email password session
      const session = await account.createEmailPasswordSession(
        email, 
        password
      );
      
      // Fetch user profile to validate role and status
      const user = await this.getCurrentUser();
      
      if (!user.isActive) {
        throw new Error('Account is deactivated. Please contact support.');
      }
      
      return { session, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  // Get user profile with role-specific details
  async getCurrentUser() {
    try {
      const accountDetails = await account.get();
      
      // Fetch additional user details from database
      const userProfile = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        accountDetails.$id
      );
      
      return {
        ...accountDetails,
        ...userProfile // Include all profile data
      };
    } catch (error) {
      return null;
    }
  },

  // Create email verification
  async createVerification() {
    try {
      return await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify`
      );
    } catch (error) {
      console.error('Verification creation error:', error);
      throw error;
    }
  },

  // Confirm email verification and update user profile
  async confirmVerification(userId, secret) {
    try {
      const result = await account.updateVerification(userId, secret);
      
      // Update user profile to mark as verified
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        userId,
        {
          isVerified: true,
          updatedAt: new Date().toISOString()
        }
      );
      
      return result;
    } catch (error) {
      console.error('Verification confirmation error:', error);
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      return await account.createPasswordRecovery(
        email, 
        `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
      );
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Confirm password reset
  async confirmPasswordReset(userId, secret, newPassword) {
    try {
      return await account.updateRecovery(
        userId, 
        secret, 
        newPassword
      );
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw error;
    }
  },

  // Get available ambulance drivers by pin code and time slot
  async getAvailableAmbulanceDrivers(pinCode, timeSlot = null) {
    try {
      let queries = [
        Query.equal('role', 'ambulance_driver'),
        Query.equal('pinCode', pinCode),
        Query.equal('isActive', true),
        Query.equal('isVerified', true)
      ];
      
      if (timeSlot) {
        queries.push(Query.equal('availabilitySlot', timeSlot));
      }
      
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        queries
      );
      
      return response.documents;
    } catch (error) {
      console.error('Fetching ambulance drivers error:', error);
      throw error;
    }
  },

  // Update user profile with role-specific validation
  async updateProfile(userId, updateData) {
    try {
      // Get current profile
      const currentProfile = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        userId
      );
      
      // Validate role-specific updates
      if (currentProfile.role === 'ambulance_driver') {
        if (updateData.availabilitySlot && !['6:00-14:00', '14:00-22:00', '22:00-6:00'].includes(updateData.availabilitySlot)) {
          throw new Error('Invalid availability slot');
        }
        
        if (updateData.pinCode && !updateData.pinCode.match(/^\d{6}$/)) {
          throw new Error('Invalid pin code format');
        }
      }
      
      if (currentProfile.role === 'patient') {
        if (updateData.emergencyContact && !updateData.emergencyContact.match(/^\d{10}$/)) {
          throw new Error('Invalid emergency contact number');
        }
      }
      
      // Add update timestamp
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      return await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        userId,
        updatedData
      );
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  // Update driver status and location
  async updateDriverStatus(userId, isOnDuty, currentLocation = null) {
    try {
      return await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        userId,
        {
          isOnDuty,
          currentLocation,
          updatedAt: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Driver status update error:', error);
      throw error;
    }
  },

  // Add rating for driver
  async addDriverRating(driverId, rating, comment = '') {
    try {
      const driver = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        driverId
      );
      
      const newRating = {
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      const ratings = [...(driver.ratings || []), newRating];
      const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      
      return await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        driverId,
        {
          ratings,
          averageRating: parseFloat(averageRating.toFixed(1)),
          updatedAt: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Adding driver rating error:', error);
      throw error;
    }
  },

  // Submit feedback
  async submitFeedback(userId, rating, responseTime, staffBehavior, comments) {
    try {
      

      const feedback = {
        rating,
        responseTime,
        staffBehavior,
        comments,
        userId
      };

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID
        process.env.NEXT_PUBLIC_FEEDBACK_COLLECTION_ID, // Collection ID
        ID.unique(),
        feedback
      );

      return { success: true, message: "Feedback submitted successfully" };
    } catch (error) {
      console.error("Error submitting feedback:", error);
      return { success: false, message: "Failed to submit feedback" };
    }
  },

};