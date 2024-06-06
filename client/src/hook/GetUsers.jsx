import { useState, useEffect } from 'react';



const useGetUsers = () => {
  const [users, setUsers] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {

      setUser(user);
    });

    return () => unsubscribe();
  }, []);

 

  return {
    user,
    error, 
  };
};

export default useGetUsers;