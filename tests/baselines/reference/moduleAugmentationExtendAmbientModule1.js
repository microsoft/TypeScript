//// [tests/cases/compiler/moduleAugmentationExtendAmbientModule1.ts] ////

//// [map.ts]
import { Observable } from "observable"

(<any>Observable.prototype).map = function() { }

declare module "observable" {
    interface Observable<T> {
        map<U>(proj: (e:T) => U): Observable<U>
    }
    namespace Observable {
        let someAnotherValue: number;
    }
}

//// [observable.d.ts]
declare module "observable" {
    class Observable<T> {
        filter(pred: (e:T) => boolean): Observable<T>;
    }
    namespace Observable {
        let someValue: number;
    }
}

//// [main.ts]
/// <reference path="observable.d.ts"/>
import { Observable } from "observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);

//// [map.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("observable");
observable_1.Observable.prototype.map = function () { };
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./map");
let x;
let y = x.map(x => x + 1);
