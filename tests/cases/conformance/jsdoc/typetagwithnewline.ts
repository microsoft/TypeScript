// @allowJs: true
// @filename: typetagwithnewline.js
// @out: dummy175.js
/** @class Matryoshka */
function Matryoshka() {}

/**
 * @type {(!Array.<number>|
 *         !Array.<!Array.<number>>)}
 */
Matryoshka.mini;

/**
 * @type (!Array.<number>|!Array.<!Array.<number>>|
 *        !Array.<!Array.<!Array.<number>>>)
 */
Matryoshka.mega;
