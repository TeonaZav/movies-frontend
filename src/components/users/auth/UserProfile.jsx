import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout, login, loading } = useAuth();

  useEffect(() => {
    // Assume a function to get user details if logged in
    if (user) {
      console.log("User is logged in:", user);
    }
  }, [user]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        user ? (
          <div>
            <h1>Welcome, {user.name}!</h1>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => login({ id: '123', name: 'Example User' })}>Login</button>
        )
      )}
    </div>
  );
};

export default UserProfile;