// @filename: lateboundWindowToplevelAssignment.js
// @allowJs: true
// @checkJs: true
// @noEmit: true
const UPDATE_MARKER_FUNC = 'updateMarkerPosition';
window[UPDATE_MARKER_FUNC] = () => {};
// class C { [UPDATE_MARKER_FUNC] = 1 }
