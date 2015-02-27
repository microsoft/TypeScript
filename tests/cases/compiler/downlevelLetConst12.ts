// @target:es5

'use strict'
// top level let\const should not be renamed
let foo;
const bar = 1;

let [baz] = [];
let {a: baz2} = { a: 1 };

const [baz3] = []
const {a: baz4} = { a: 1 };