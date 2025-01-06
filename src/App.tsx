// import { Button } from "./components/ui/button";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { useAppStore } from "./store/store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "./lib/auth-client";
import { GET_USER_INFO } from "./utils/constants";

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  const { userInfo } = useAppStore();
  return userInfo ? element : <Navigate to="/auth" />;
};

const AuthRoute = ({ element }: { element: React.ReactElement }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Navigate to="/chat" /> : element;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          method: "GET",
          withCredentials: true,
        });
        const data = response.data;
        if (response.status) setUserInfo(data);
      } catch (error) {
        setLoading(false);
        toast.error("Error while fetching user info. " + error);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo && loading) fetchUserInfo();
    else setLoading(false);
  }, [userInfo, setUserInfo, setLoading, loading]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute element={<Auth />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
