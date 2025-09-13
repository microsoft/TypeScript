//// [tests/cases/compiler/moduleAugmentationNoNewNames.ts] ////

//// [map.ts]
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface Observable<T> {
        map<U>(proj: (e:T) => U): Observable<U>
    }
    class Bar {}
    let y: number, z: string;
    let {a: x, b: x1}: {a: number, b: number};
    namespace Z {}
}

//// [observable.ts]
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}

//// [main.ts]
import { Observable } from "./observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);

//// [observable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [map.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("./observable");
observable_1.Observable.prototype.map = function () { };
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./map");
var x;
var y = x.map(function (x) { return x + 1; });
