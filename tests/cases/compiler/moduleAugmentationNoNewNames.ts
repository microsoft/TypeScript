// @module: commonjs

// @filename: map.ts
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface Observable<T> {
        map<U>(proj: (e:T) => U): Observable<U>
    }
    class Bar {}
    let y: number, z: string;
    let {a: x, b: x1}: {a: number, b: number};
    module Z {}
}

// @filename: observable.ts
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}

// @filename: main.ts
import { Observable } from "./observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);