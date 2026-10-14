// @module: commonjs
// @esModuleInterop: true,false
// @noEmit: true

// @filename: mod.d.ts
interface Base<T> {
    value: T;
}
interface Callable extends Base<string> {
    (): void;
    __esModule: true;
    other: number;
}
declare const callable: Callable;
export = callable;

// @filename: main.ts
import * as ns from "./mod";
const value: string = ns.value;
const other: number = ns.other;
