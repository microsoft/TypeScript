// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: /a.js

/**
 * @typedef {{
*     a: number | string;
*     b: boolean | string[];
* }} Foo
*/

/**
* @template {Foo} T
*/
class A {
   /**
    * @param {T} a
    */
   constructor(a) {
       return a
   }
}

/**
* @extends {A<{
*     a: string,
*     b: string[]
* }>}
*/
class B extends A {}

/**
 * @extends {A<{
 *     a: string,
 *     b: string
 * }>}
 */
class C extends A {}

/**
 * @extends {A<{a: string, b: string[]}>}
 */
class D extends A {}

/**
 * @extends {A<{a: string, b: string}>}
 */
class E extends A {}
