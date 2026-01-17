import { createSlice } from "@reduxjs/toolkit";

import type { UserProfileData } from "./components/EditProfileModal";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProfileState = {
  profile: UserProfileData;
};

function getInitialProfile(): ProfileState {
  const saved = localStorage.getItem("userProfile");
  if (saved) {
    try {
      return { profile: JSON.parse(saved) };
    } catch {
      /* empty */
    }
  }
  return {
    profile: {
      name: "Dr. You",
      bio: "Quantum Computing Researcher",
      field: "Quantum Computing",
      location: "Stanford, CA",
      website: "research.stanford.edu/~you",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
  };
}

const initialState: ProfileState = getInitialProfile();

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<UserProfileData>) {
      state.profile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    loadProfile(state) {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        try {
          state.profile = JSON.parse(saved);
        } catch {
          /* empty */
        }
      }
    },
  },
});

export const { updateProfile, loadProfile } = profileSlice.actions;
export const selectProfile = (state: { profile: ProfileState }) =>
  state.profile;
export default profileSlice.reducer;
