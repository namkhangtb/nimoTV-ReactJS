import { createSelector } from '@reduxjs/toolkit';
import { HeaderState } from './types';
import { RootState } from 'types/RootState';

export const HeaderSelector = (state: RootState) => state.header;

// Here type of `someState` will be inferred ✅
const selectorShowModalLoginSignup = createSelector(
  HeaderSelector,
  someState => someState?.showModalLoginSignup,
);

const selectorIsLogged = createSelector(
  HeaderSelector,
  someState => someState?.isLogged,
);

const selectorShowModalRechargeDiamond = createSelector(
  HeaderSelector,
  someState => someState?.showModalRechargeDiamond,
);

const selectorShowModalRegisStreamer = createSelector(
  HeaderSelector,
  someState => someState?.showModalRegisStreamer,
);

const selectorIsStreamer = createSelector(
  HeaderSelector,
  someState => someState?.isStreamer,
);

const selectorIdUser = createSelector(
  HeaderSelector,
  someState => someState?.idUser,
);
const selectorIdStreamer = createSelector(
  HeaderSelector,
  someState => someState?.idStreamer,
);
const selectorIdLiveStream = createSelector(
  HeaderSelector,
  someState => someState?.idLiveStream,
);
const selectorImgAvatar = createSelector(
  HeaderSelector,
  someState => someState?.imgAvatar,
);
const selectorDiamond = createSelector(
  HeaderSelector,
  someState => someState?.diamond,
);

export {
  selectorShowModalLoginSignup,
  selectorIsLogged,
  selectorShowModalRechargeDiamond,
  selectorShowModalRegisStreamer,
  selectorIsStreamer,
  selectorIdUser,
  selectorIdStreamer,
  selectorIdLiveStream,
  selectorImgAvatar,
  selectorDiamond,
};
