/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const NimoShow = lazyLoad(
  () => import('./index'),
  module => module.NimoShow,
);
