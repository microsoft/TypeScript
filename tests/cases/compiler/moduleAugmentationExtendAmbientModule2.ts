// @module: commonjs
// @declaration: true

// @filename: map.ts
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

// @filename: observable.d.ts
declare module "observable" {
    class Observable<T> {
        filter(pred: (e:T) => boolean): Observable<T>;
    }
    namespace Observable {
        export let someValue: number;
    }
}

// @filename: main.ts

/// <reference path="observable.d.ts"/>
import { Observable } from "observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);
let z1 = Observable.someValue.toFixed();
let z2 = Observable.someAnotherValue.toLowerCase();