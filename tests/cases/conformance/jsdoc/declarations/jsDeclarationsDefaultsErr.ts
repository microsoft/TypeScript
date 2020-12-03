// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index1.js
// merge type alias and alias (should error, see #32367)
class Cls {
    x = 12;
    static y = "ok"
}
export default Cls;
/**
 * @typedef {string | number} default
 */

// @filename: index2.js
// merge type alias and class (error message improvement needed, see #32368)
export default class C {};
/**
 * @typedef {string | number} default
 */

// @filename: index3.js
// merge type alias and variable (behavior is borked, see #32366)
const x = 12;
export {x as default};
/**
 * @typedef {string | number} default
 */
