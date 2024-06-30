import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅

import { useInjectReducer } from 'redux-injectors';
import { StreamerManageState } from './types';

// The initial state of the Homepage
export const initialState: StreamerManageState = {
  showModalEditStreamerInfo: false,
  showModalDetailsDiamondDonate: false,
  showModalCancelStream: false,
  nameChannel: '',
  describeChannel: '',
  streamUrl: '',
  isStreaming: false,
  titleStream: '',
  liveStreamId: 0,
};

const slice = createSlice({
  name: 'streamerManage',
  initialState,
  reducers: {
    // changeUsername(state, action: PayloadAction<string>) {
    //   // Here we say lets change the username in my homepage state when changeUsername actions fires
    //   // Type-safe: It will expect `string` when firing the action. ✅
    //   state.username = action.payload;
    // },
    toggleModalEditStreamerInfo(state, action) {
      state.showModalEditStreamerInfo = action.payload;
    },
    toggleModalDetailsDiamondDonate(state, action) {
      state.showModalDetailsDiamondDonate = action.payload;
    },
    toggleModalCancelStream(state, action) {
      state.showModalCancelStream = action.payload;
    },
    setNameChannel(state, action) {
      state.nameChannel = action.payload;
    },
    setDescribeChannel(state, action) {
      state.describeChannel = action.payload;
    },
    setStreamUrl(state, action) {
      state.streamUrl = action.payload;
    },
    setTitleStream(state, action) {
      state.titleStream = action.payload;
    },
    toggleSetIsStreaming(state, action) {
      state.isStreaming = action.payload;
    },
    setLiveStreamId(state, action) {
      state.liveStreamId = action.payload;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const { actions: StreamerManageActions } = slice;

/**
 * Let's turn this into a hook style usage. This will inject the slice to redux store and return actions in case you want to use in the component
 */
export const useStreamerManageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
