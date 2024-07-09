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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [map1.js]
define(["require", "exports", "./observable"], function (require, exports, observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    observable_1.Observable.prototype.map = function () { };
});
//// [map2.js]
define(["require", "exports", "./observable"], function (require, exports, observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    observable_1.Observable.prototype.map = function () { };
});
//// [main.js]
define(["require", "exports", "./map1", "./map2"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x;
});


//// [observable.d.ts]
export declare class Observable<T> {
    filter(pred: (e: T) => boolean): Observable<T>;
}
//// [map1.d.ts]
declare module "./observable" {
    interface I {
        x0: any;
    }
}
export {};
//// [map2.d.ts]
declare module "./observable" {
    interface I {
        x1: any;
    }
}
export {};
//// [main.d.ts]
import "./map1";
import "./map2";
