/* --- STATE --- */
export interface HeaderState {
  showModalLoginSignup: boolean;
  showModalRechargeDiamond: boolean;
  showModalRegisStreamer: boolean;
  tabSelected: number;
  isLogged: boolean;
  isStreamer: boolean;
  idStreamer: number | null;
  idUser: number | null;
  idLiveStream: number | null;
  imgAvatar: string;
  diamond: number;
}
