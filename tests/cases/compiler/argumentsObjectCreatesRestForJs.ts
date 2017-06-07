// @checkJs: true
// @allowJs: true
// @Filename: main.js
// @noemit: true
function allRest() { arguments; }
allRest();
allRest(1, 2, 3);
function someRest(x, y) { arguments; }
someRest(); // x and y are still optional because they are in a JS file
someRest(1, 2, 3);

/**
 * @param {number} x - a thing
 */
function jsdocced(x) { arguments; }
jsdocced(1);

function dontDoubleRest(x, ...y) { arguments; }
dontDoubleRest(1, 2, 3);

