//// [tests/cases/compiler/jsFileMethodOverloads4.ts] ////

//// [a.js]
export function Foo() { }

/**
 * @overload
 * @param {string} a
 * @return {void}
 */

/**
 * @overload
 * @param {number} a
 * @param {string} b
 * @return {void}
 */

/**
 * @param {string | number} a
 * @param {string} [b]
 * @return {void}
 */
Foo.prototype.bar = function (a, b) { }




//// [a.d.ts]
export function Foo(): void;
export class Foo {
    /**
     * @overload
     * @param {string} a
     * @return {void}
     */
    bar(a: string): void;
    /**
     * @overload
     * @param {number} a
     * @param {string} b
     * @return {void}
     */
    bar(a: number, b: string): void;
}
