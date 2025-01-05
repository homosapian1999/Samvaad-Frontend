import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.isProfileComplete) {
      toast("Please complete your profile first");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div></div>;
};

export default Chat;
