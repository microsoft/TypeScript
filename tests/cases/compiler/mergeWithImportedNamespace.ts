// @module:commonjs
// @filename: f1.ts
export namespace N { export var x = 1; }

// @filename: f2.ts
import {N} from "./f1";
// partial revert of https://github.com/Microsoft/TypeScript/pull/7583 to prevent breaking changes
export namespace N {
    export interface I {x: any}
}