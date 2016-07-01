// @module: commonjs
// @filename: f1.ts
export function f() {
}

// @filename: f2.ts
import {f} from './f1';
export function f() {
}