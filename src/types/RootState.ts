// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { HeaderState } from 'app/components/Header/slice/types';
import { StreamerManageState } from 'app/pages/StreamManager/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  header?: HeaderState;
  streamerManage?: StreamerManageState;
}
