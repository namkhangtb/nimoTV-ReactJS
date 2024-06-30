import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import { HeaderState } from './types';
import { useInjectReducer } from 'redux-injectors';

// The initial state of the Homepage
export const initialState: HeaderState = {
  showModalLoginSignup: false,
  showModalRechargeDiamond: false,
  showModalRegisStreamer: false,
  tabSelected: 0,
  isLogged: false,
  isStreamer: false,
  idStreamer: null,
  idUser: null,
  idLiveStream: null,
  imgAvatar: '',
  diamond: 0,
};

const slice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    // changeUsername(state, action: PayloadAction<string>) {
    //   // Here we say lets change the username in my homepage state when changeUsername actions fires
    //   // Type-safe: It will expect `string` when firing the action. ✅
    //   state.username = action.payload;
    // },
    RESET_STATE(state) {
      state.showModalLoginSignup = false;
      state.showModalRechargeDiamond = false;
      state.showModalRegisStreamer = false;
      state.tabSelected = 0;
      state.isLogged = false;
      state.isStreamer = false;
      state.idStreamer = null;
      state.idUser = null;
      state.idLiveStream = null;
      state.imgAvatar = '';
    },
    toggleModalLoginSignup(state, action) {
      state.showModalLoginSignup = action.payload;
    },
    toggleSetLogged(state) {
      state.isLogged = !state.isLogged;
    },
    toggleModalRechargeDiamond(state, action) {
      state.showModalRechargeDiamond = action.payload;
    },
    toggleModalRegisStreamer(state, action) {
      state.showModalRegisStreamer = action.payload;
    },
    toggleSetIsStreamer(state, action) {
      state.isStreamer = action.payload;
    },
    setIdUser(state, action) {
      state.idUser = action.payload;
    },
    setIdStreamer(state, action) {
      state.idStreamer = action.payload;
    },
    setIdLiveStream(state, action) {
      state.idLiveStream = action.payload;
    },
    setImgAvatar(state, action) {
      state.imgAvatar = action.payload;
    },
    setDiamond(state, action) {
      state.diamond = action.payload;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const { actions: HeaderActions } = slice;

/**
 * Let's turn this into a hook style usage. This will inject the slice to redux store and return actions in case you want to use in the component
 */
export const useHeaderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
