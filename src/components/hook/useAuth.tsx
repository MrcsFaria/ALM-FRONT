// hooks/useAuth.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const requireAuth = (redirectPath: string) => {
    if (!isAuthenticated) {
      navigate(redirectPath);
    }
  };

  const redirectIfAuthenticated = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    }
  };

  return { isAuthenticated, requireAuth, redirectIfAuthenticated };
};
