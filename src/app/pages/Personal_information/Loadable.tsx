/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Personal_information = lazyLoad(
  () => import('./index'),
  module => module.Personal_information,
);
