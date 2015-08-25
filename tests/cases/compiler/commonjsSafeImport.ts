// @target: ES5
// @module: commonjs
// @declaration: true
// @filename: 10_lib.ts

export function Foo() {}

// @filename: main.ts
import { Foo } from './10_lib';

Foo();
