import { useAppStore } from "@/store/store";

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <div>
      Profile
      {userInfo ? <div>Email: {userInfo.email}</div> : <div>No Email...</div>}
    </div>
  );
};

export default Profile;
