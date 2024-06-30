import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types/RootState';

export const StreamManagerSelector = (state: RootState) => state.streamerManage;

// Here type of `someState` will be inferred ✅
const selectorNameChannel = createSelector(
  StreamManagerSelector,
  someState => someState?.nameChannel,
);

const selectorDescribeChannel = createSelector(
  StreamManagerSelector,
  someState => someState?.describeChannel,
);
const selectorShowModalEditStreamerInfo = createSelector(
  StreamManagerSelector,
  someState => someState?.showModalEditStreamerInfo,
);
const selectorShowModalDetailsDiamondDonate = createSelector(
  StreamManagerSelector,
  someState => someState?.showModalDetailsDiamondDonate,
);

const selectorShowModalCancelStream = createSelector(
  StreamManagerSelector,
  someState => someState?.showModalCancelStream,
);

const selectorStreamUrl = createSelector(
  StreamManagerSelector,
  someState => someState?.streamUrl,
);
const selectorIsStreaming = createSelector(
  StreamManagerSelector,
  someState => someState?.isStreaming,
);
const selectorTitleStream = createSelector(
  StreamManagerSelector,
  someState => someState?.titleStream,
);
const selectorLiveStreamId = createSelector(
  StreamManagerSelector,
  someState => someState?.liveStreamId,
);

export {
  selectorNameChannel,
  selectorDescribeChannel,
  selectorShowModalEditStreamerInfo,
  selectorStreamUrl,
  selectorIsStreaming,
  selectorTitleStream,
  selectorLiveStreamId,
  selectorShowModalDetailsDiamondDonate,
  selectorShowModalCancelStream,
};
