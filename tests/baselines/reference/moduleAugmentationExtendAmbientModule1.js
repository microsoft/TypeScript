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
exports.__esModule = true;
var observable_1 = require("observable");
observable_1.Observable.prototype.map = function () { };
//// [main.js]
"use strict";
exports.__esModule = true;
require("./map");
var x;
var y = x.map(function (x) { return x + 1; });
