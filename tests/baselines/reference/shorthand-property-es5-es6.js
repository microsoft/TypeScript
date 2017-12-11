//// [test.ts]
import {foo} from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.js]
import { foo } from './foo';
var baz = 42;
var bar = { foo: foo, baz: baz };


//// [test.d.ts]
export {};
