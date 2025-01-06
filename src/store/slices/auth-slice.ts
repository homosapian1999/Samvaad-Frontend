interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  color?: number;
  token?: string;
  profileSetup?: boolean;
}

export interface AuthSlice {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const createAuthSlice = (
  set: (partial: Partial<AuthSlice>) => void
): AuthSlice => ({
  userInfo: undefined,
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
});
