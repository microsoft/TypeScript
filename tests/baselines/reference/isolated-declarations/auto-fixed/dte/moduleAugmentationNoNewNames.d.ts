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
    module Z {}
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

/// [Declarations] ////



//// [main.d.ts]
import "./map";

//// [map.d.ts]
declare module "./observable" {
    interface Observable<T> {
        map<U>(proj: (e: T) => U): Observable<U>;
    }
    class Bar {
    }
    let y: number, z: string;
    let x: invalid, x1: invalid;
    namespace Z { }
}
export {};

//// [observable.d.ts]
export declare class Observable<T> {
    filter(pred: (e: T) => boolean): Observable<T>;
}

/// [Errors] ////

map.ts(11,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
map.ts(11,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== map.ts (2 errors) ====
    import { Observable } from "./observable"
    
    (<any>Observable.prototype).map = function() { }
    
    declare module "./observable" {
        interface Observable<T> {
            map<U>(proj: (e:T) => U): Observable<U>
        }
        class Bar {}
        let y: number, z: string;
        let {a: x, b: x1}: {a: number, b: number};
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        module Z {}
    }
    
==== observable.ts (0 errors) ====
    export declare class Observable<T> {
        filter(pred: (e:T) => boolean): Observable<T>;
    }
    
==== main.ts (0 errors) ====
    import { Observable } from "./observable"
    import "./map";
    
    let x: Observable<number>;
    let y = x.map(x => x + 1);