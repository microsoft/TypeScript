// @target: ES6
// @module: commonjs

// @filename: existingModule.ts
export var x = 1;

// @filename: test.ts
import {x} from './existingModule';
import {foo} from './missingModule';

declare function use(a: any): void;

const test = { x, foo };

use(x);
use(foo);