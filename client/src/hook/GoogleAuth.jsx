import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';


const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('Popup closed by user before completing authentication.');
      } else {
        console.error('Google Authentication Error:', error);
      }
      setError(error); 
    }
  };

  return {
    user,
    signInWithGoogle,
    error, 
  };
};

export default useGoogleAuth;
