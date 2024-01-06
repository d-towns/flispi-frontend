import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
import { User } from "../models/User.models";
import * as authService from "../services/auth.service";

  interface AuthContextType {
    user?: User;
    loading: boolean;
    error?: any;
    login: (username: string, password: string) => void;
    signUp: (email: string, username: string, phone: string, password: string) => void;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  // Export the provider as we need to wrap the entire app with it
  export function AuthProvider({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    useEffect(() => {
      authService.getCurrentUser()
        .then((user) => setUser(user))
        .catch((_error) => {})
        .finally(() => setLoadingInitial(false));
    }, []);

    /**
     * Login a user
     * @param username 
     * @param password 
     */
    function login(username: string, password: string) {
      setLoading(true);
  
      authService.login({ username, password })
        .then((user) => {
          setUser(user);

        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    /**
     *  Sign up a new user
     * @param email 
     * @param username 
     * @param phone 
     * @param password 
     */
    function signUp(email: string,  username: string,phone: string, password: string) {
      setLoading(true);
  
      authService.register({ email, username, phone, password })
        .then((user) => {
          setUser(user);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  
    /**
     * Logout the current user
     */
    function logout() {
      authService.logout().then(() => setUser(undefined));
    }
  
    // The provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
      () => ({
        user,
        loading,
        error,
        login,
        signUp,
        logout,
      }),
      [user, loading, error]
    );
  
    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
      <AuthContext.Provider value={memoedValue}>
        {!loadingInitial && children}
      </AuthContext.Provider>
    );
  }
  
  // A custom hook to quickly read the auth context 
  export default function useAuth() {
    return useContext(AuthContext);
  }