//// [tests/cases/compiler/shorthand-property-es6-es6.ts] ////

//// [test.ts]
import {foo} from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.js]
import { foo } from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.d.ts]
export {};
