// @module: amd
// @declaration: true

// @filename: map1.ts
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface I {x0}
}

// @filename: map2.ts
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface I {x1}
}


// @filename: observable.ts
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}

// @filename: main.ts
import { Observable } from "./observable"
import "./map1";
import "./map2";

let x: Observable<number>;
