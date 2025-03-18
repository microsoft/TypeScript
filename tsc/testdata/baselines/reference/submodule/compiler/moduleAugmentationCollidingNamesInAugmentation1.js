//// [tests/cases/compiler/moduleAugmentationCollidingNamesInAugmentation1.ts] ////

//// [map1.ts]
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface I {x0}
}

//// [map2.ts]
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface I {x1}
}


//// [observable.ts]
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}

//// [main.ts]
import { Observable } from "./observable"
import "./map1";
import "./map2";

let x: Observable<number>;


//// [observable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [map1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("./observable");
observable_1.Observable.prototype.map = function () { };
//// [map2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("./observable");
observable_1.Observable.prototype.map = function () { };
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./map1");
require("./map2");
let x;
