// @module: commonjs
// @target: es2020

// @filename: bar.ts
export class Bar {
    name: string = "bar";
}
export function baz() {
    return "baz";
}

// @filename: reexport.ts
import { Bar } from './bar';
export = Bar;
