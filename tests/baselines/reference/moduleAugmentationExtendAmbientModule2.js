//// [tests/cases/compiler/moduleAugmentationExtendAmbientModule2.ts] ////

//// [map.ts]
import { Observable } from "observable"

(<any>Observable.prototype).map = function() { }

declare module "observable" {
    interface Observable<T> {
        map<U>(proj: (e:T) => U): Observable<U>
    }
    namespace Observable {
        let someAnotherValue: string;
    }
}

//// [observable.d.ts]
declare module "observable" {
    class Observable<T> {
        filter(pred: (e:T) => boolean): Observable<T>;
    }
    namespace Observable {
        export let someValue: number;
    }
}

//// [main.ts]
/// <reference path="observable.d.ts"/>
import { Observable } from "observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);
let z1 = Observable.someValue.toFixed();
let z2 = Observable.someAnotherValue.toLowerCase();

//// [map.js]
"use strict";
exports.__esModule = true;
var observable_1 = require("observable");
observable_1.Observable.prototype.map = function () { };
//// [main.js]
"use strict";
exports.__esModule = true;
/// <reference path="observable.d.ts"/>
var observable_1 = require("observable");
require("./map");
var x;
var y = x.map(function (x) { return x + 1; });
var z1 = observable_1.Observable.someValue.toFixed();
var z2 = observable_1.Observable.someAnotherValue.toLowerCase();


//// [map.d.ts]
declare module "observable" {
    interface Observable<T> {
        map<U>(proj: (e: T) => U): Observable<U>;
    }
    namespace Observable {
        let someAnotherValue: string;
    }
}
export {};
//// [main.d.ts]
/// <reference path="observable.d.ts" />
import "./map";
