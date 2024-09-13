// @noEmit: true
// @allowJs: true

// https://github.com/microsoft/TypeScript/issues/59920

// @filename: utils.js
export const getUserProfileByUsername = ({
  username,
  withEmail = false,
  withNotificationSettings = false,
} = {}) => {
  return {};
};

// @filename: main.ts
import { getUserProfileByUsername } from './utils';

getUserProfileByUsername({
  username: 'ly', // ok
});

getUserProfileByUsername({}); // ok
