//// [tests/cases/compiler/moduleAugmentationDisallowedExtensions.ts] ////

//// [x0.ts]
export let a = 1;

//// [x.ts]
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

//// [observable.ts]
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}
export var x = 1;

//// [test.ts]
export let b = 1;

//// [main.ts]
import { Observable } from "./observable"
import "./x";


//// [x0.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 1;
//// [x.js]
"use strict";
exports.__esModule = true;
var N1;
(function (N1) {
    N1.x = 1;
})(N1 || (N1 = {}));
//// [observable.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;
//// [test.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 1;
//// [main.js]
"use strict";
exports.__esModule = true;
require("./x");
