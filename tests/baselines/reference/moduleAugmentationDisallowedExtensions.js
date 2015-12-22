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
    let {x1, y1}: {x1: number, y1: string}
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
export {}

//// [observable.ts]
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}
export var x = 1;

//// [main.ts]
import { Observable } from "./observable"
import "./x";


//// [x0.js]
"use strict";
exports.a = 1;
//// [x.js]
"use strict";
var N1;
(function (N1) {
    N1.x = 1;
})(N1 || (N1 = {}));
//// [observable.js]
"use strict";
exports.x = 1;
//// [main.js]
"use strict";
require("./x");
