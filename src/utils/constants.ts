export const HOST = import.meta.env.VITE_SERVER_URL as string;
export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST as string;

export const AUTH_ROUTES = "/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "/profile";
export const SEARCH_ROUTE = `${CONTACTS_ROUTES}/search-contacts`;
export const CONTACTS_FOR_DM_LIST = `${CONTACTS_ROUTES}/get-dm-list`;
export const ALL_CONTACTS = `${CONTACTS_ROUTES}/get-all-contacts`;

export const CHAT_ROUTES = "/chat";
export const GET_MESSAGES = `${CHAT_ROUTES}/get-messages`;
export const UPLOAD_FILE = `${CHAT_ROUTES}/upload-file`;
export const CREATE_CHANNEL_ROUTE = `${CHAT_ROUTES}/create-channel`;
export const GET_CHANNELS_ROUTE = `${CHAT_ROUTES}/get-channels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHAT_ROUTES}/get-channel-messages`;
