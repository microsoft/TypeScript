// @target: ES6
// @module: commonjs

// @filename: foo1.ts
export var x = 1;

// @filename: test.ts
import {x} from './foo1';
import {foo} from './foo2';

const test = { x, foo };

console.log(x);
console.log(foo);