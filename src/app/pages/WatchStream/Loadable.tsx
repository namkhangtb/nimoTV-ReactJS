/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const WatchStream = lazyLoad(
  () => import('./index'),
  module => module.WatchStream,
);
