// @module: commonjs

// @filename: map.ts
import { Observable } from "./observable"

(<any>Observable.prototype).map = function() { }

declare module "./observable" {
    interface Observable<T> {
        map<U>(proj: (e:T) => U): Observable<U>
    }
    namespace Observable {
        let someAnotherValue: string;
    }
}

// @filename: observable.ts
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}

export namespace Observable {
    export let someValue: number;
}


// @filename: main.ts
import { Observable } from "./observable"
import "./map";

let x: Observable<number>;
let y = x.map(x => x + 1);
let z1 = Observable.someValue.toFixed();
let z2 = Observable.someAnotherValue.toLowerCase();