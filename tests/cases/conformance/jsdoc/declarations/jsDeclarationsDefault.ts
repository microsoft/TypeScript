// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index1.js
export default 12;

// @filename: index2.js
export default function foo() {
    return foo;
}
export const x = foo;
export { foo as bar };

// @filename: index3.js
export default class Foo {
    a = /** @type {Foo} */(null);
};
export const X = Foo;
export { Foo as Bar };

// @filename: index4.js
import Fab from "./index3";
class Bar extends Fab {
    x = /** @type {Bar} */(null);
}
export default Bar;

// @filename: index5.js
// merge type alias and const (OK)
export default 12;
/**
 * @typedef {string | number} default
 */

// @filename: index6.js
// merge type alias and function (OK)
export default function func() {};
/**
 * @typedef {string | number} default
 */
