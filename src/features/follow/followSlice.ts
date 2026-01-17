import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type FollowState = {
  followedAuthors: string[];
};

function getInitialFollowState(): FollowState {
  const saved = localStorage.getItem("followedAuthors");
  if (saved) {
    try {
      return { followedAuthors: JSON.parse(saved) };
    } catch {
      /* empty */
    }
  }
  return { followedAuthors: [] };
}

const initialState: FollowState = getInitialFollowState();

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    follow(state, action: PayloadAction<string>) {
      if (!state.followedAuthors.includes(action.payload)) {
        state.followedAuthors.push(action.payload);
        localStorage.setItem(
          "followedAuthors",
          JSON.stringify(state.followedAuthors),
        );
      }
    },
    unfollow(state, action: PayloadAction<string>) {
      state.followedAuthors = state.followedAuthors.filter(
        (id) => id !== action.payload,
      );
      localStorage.setItem(
        "followedAuthors",
        JSON.stringify(state.followedAuthors),
      );
    },
    toggleFollow(state, action: PayloadAction<string>) {
      if (state.followedAuthors.includes(action.payload)) {
        state.followedAuthors = state.followedAuthors.filter(
          (id) => id !== action.payload,
        );
      } else {
        state.followedAuthors.push(action.payload);
      }
      localStorage.setItem(
        "followedAuthors",
        JSON.stringify(state.followedAuthors),
      );
    },
  },
});

export const { follow, unfollow, toggleFollow } = followSlice.actions;
export const selectFollow = (state: { follow: FollowState }) => state.follow;
export default followSlice.reducer;
