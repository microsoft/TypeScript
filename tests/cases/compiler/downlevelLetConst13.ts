// @target:es5
// @module: commonjs

'use strict'
// exported let\const bindings should not be renamed

export let foo = 10;
export const bar = "123"
export let [bar1] = [1];
export const [bar2] = [2];
export let {a: bar3} = { a: 1 };
export const {a: bar4} = { a: 1 };

export module M {
    export let baz = 100;
    export const baz2 = true;
    export let [bar5] = [1];
    export const [bar6] = [2];
    export let {a: bar7} = { a: 1 };
    export const {a: bar8} = { a: 1 };
}