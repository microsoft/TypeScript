//// [tests/cases/compiler/shorthandPropertyAssignmentInES6Module.ts] ////

//// [foo1.ts]

export var x = 1;

//// [test.ts]
import {x} from './foo1';
import {foo} from './foo2';

const test = { x, foo };

console.log(x);
console.log(foo);

//// [foo1.js]
exports.x = 1;
//// [test.js]
var foo1_1 = require('./foo1');
var foo2_1 = require('./foo2');
const test = { x: foo1_1.x, foo: foo2_1.foo };
console.log(foo1_1.x);
console.log(foo2_1.foo);
