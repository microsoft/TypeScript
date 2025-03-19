//// [tests/cases/compiler/downlevelLetConst12.ts] ////

//// [downlevelLetConst12.ts]
'use strict'
// top level let\const should not be renamed
let foo;
const bar = 1;

let [baz] = [];
let {a: baz2} = { a: 1 };

const [baz3] = []
const {a: baz4} = { a: 1 };

//// [downlevelLetConst12.js]
'use strict';
// top level let\const should not be renamed
let foo;
const bar = 1;
let [baz] = [];
let { a: baz2 } = { a: 1 };
const [baz3] = [];
const { a: baz4 } = { a: 1 };
