// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: bug27099.js
window.name = 1;
window.console; // should not have error: Property 'console' does not exist on type 'typeof window'.
module.exports = 'anything';

