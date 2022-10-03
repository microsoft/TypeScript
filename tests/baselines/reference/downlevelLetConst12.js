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
var foo;
var bar = 1;
var baz = [][0];
var baz2 = { a: 1 }.a;
var baz3 = [][0];
var baz4 = { a: 1 }.a;
