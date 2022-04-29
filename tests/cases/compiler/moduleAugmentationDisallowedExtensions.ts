// @module: commonjs

// @filename: x0.ts
export let a = 1;

// @filename: x.ts

namespace N1 {
    export let x = 1;
}

declare module "./observable" {
    var x: number;
    let y: number;
    const z: number;
    let {x1, y1, z0: {n}, z1: {arr: [el1, el2, el3]}}: {x1: number, y1: string, z0: {n: number}, z1: {arr: number[]} }
    interface A { x }
    namespace N {
        export class C {}
    }
    class Cls {}
    function foo(): number;
    type T = number;
    import * as all from "./x0";
    import {a} from "./x0";
    export * from "./x0";
    export {a} from "./x0";
}

declare module "./test" {
    export = N1;
}
export {}

// @filename: observable.ts
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}
export var x = 1;

// @filename: test.ts
export let b = 1;

// @filename: main.ts
import { Observable } from "./observable"
import "./x";
