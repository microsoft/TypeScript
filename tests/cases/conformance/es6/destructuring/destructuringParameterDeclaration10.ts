// @strict: true
// @noEmit: true

const getUserProfileByUsername = ({
  username,
  withEmail = false,
  withNotificationSettings = false,
} = {}) => {
  return {};
};

getUserProfileByUsername({
  username: 'ly', // ok (implicit any reported at declaration site)
});
