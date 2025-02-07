// libs/appwrite.js
import { Client, Account, ID } from 'appwrite';

// Configure Appwrite client
export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// Create account instance
export const account = new Account(client);

// Authentication Service
export const authService = {
  // Create a new user account
  async register(email, password, name) {
    try {
      const response = await account.create(
        ID.unique(), 
        email, 
        password, 
        name
      );
      
      // Create email verification
      await this.createVerification();
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Create email verification
  async createVerification() {
    try {
      const verification = await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify`
      );
      return verification;
    } catch (error) {
      console.error('Verification creation error:', error);
      throw error;
    }
  },

  // Verify email
  async confirmVerification(userId, secret) {
    try {
      const result = await account.updateVerification(userId, secret);
      return result;
    } catch (error) {
      console.error('Verification confirmation error:', error);
      throw error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(
        email, 
        password
      );
      return session;
    } catch (error) {
      console.error('Login error:', error);
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

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
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
  }
};