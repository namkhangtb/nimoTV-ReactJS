/* --- STATE --- */
export interface StreamerManageState {
  showModalEditStreamerInfo: boolean;
  showModalDetailsDiamondDonate: boolean;
  showModalCancelStream: boolean;
  nameChannel: string;
  describeChannel: string;
  streamUrl: string;
  isStreaming: boolean;
  titleStream: string;
  liveStreamId: number;
}
