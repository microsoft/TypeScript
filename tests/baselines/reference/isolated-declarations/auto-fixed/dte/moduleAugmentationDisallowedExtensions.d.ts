//// [tests/cases/compiler/moduleAugmentationDisallowedExtensions.ts] ////

//// [x0.ts]
export let a = 1;

//// [x.ts]
namespace N1 {
    export let x = 1;
}

declare module "./observable" {
    var x: number;
    let y: number;
    const z: number;
    let {x1, y1, z0: {n}, z1: {arr: [el1, el2, el3]}}: {x1: number, y1: string, z0: {n: number}, z1: {arr: number[]} }
    interface A { x }
    namespace N {
        export class C {}
    }
    class Cls {}
    function foo(): number;
    type T = number;
    import * as all from "./x0";
    import {a} from "./x0";
    export * from "./x0";
    export {a} from "./x0";
}

declare module "./test" {
    export = N1;
}
export {}

//// [observable.ts]
export declare class Observable<T> {
    filter(pred: (e:T) => boolean): Observable<T>;
}
export var x = 1;

//// [test.ts]
export let b = 1;

//// [main.ts]
import { Observable } from "./observable"
import "./x";


/// [Declarations] ////



//// [/.src/main.d.ts]
import "./x";

//// [/.src/observable.d.ts]
export declare class Observable<T> {
    filter(pred: (e: T) => boolean): Observable<T>;
}
export declare var x: number;

//// [/.src/test.d.ts]
export declare let b: number;

//// [/.src/x.d.ts]
declare namespace N1 {
    let x: number;
}
declare module "./observable" {
    var x: number;
    let y: number;
    const z: number;
    let x1: invalid, y1: invalid, n: invalid, el1: invalid, el2: invalid, el3: invalid;
    interface A {
        x: any;
    }
    namespace N {
        class C {
        }
    }
    class Cls {
    }
    function foo(): number;
    type T = number;
    export * from "./x0";
    export { a } from "./x0";
}
declare module "./test" {
    export = N1;
}
export {};

//// [/.src/x0.d.ts]
export declare let a: number;
/// [Errors] ////

x.ts(9,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(9,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(9,23): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(9,38): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(9,43): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(9,48): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
x.ts(17,5): error TS2667: Imports are not permitted in module augmentations. Consider moving them to the enclosing external module.
x.ts(17,26): error TS2307: Cannot find module './x0' or its corresponding type declarations.
x.ts(18,5): error TS2667: Imports are not permitted in module augmentations. Consider moving them to the enclosing external module.
x.ts(18,21): error TS2307: Cannot find module './x0' or its corresponding type declarations.
x.ts(19,5): error TS2666: Exports and export assignments are not permitted in module augmentations.
x.ts(19,19): error TS2307: Cannot find module './x0' or its corresponding type declarations.
x.ts(20,5): error TS2666: Exports and export assignments are not permitted in module augmentations.
x.ts(20,21): error TS2307: Cannot find module './x0' or its corresponding type declarations.
x.ts(24,5): error TS2666: Exports and export assignments are not permitted in module augmentations.


==== x0.ts (0 errors) ====
    export let a = 1;
    
==== x.ts (15 errors) ====
    namespace N1 {
        export let x = 1;
    }
    
    declare module "./observable" {
        var x: number;
        let y: number;
        const z: number;
        let {x1, y1, z0: {n}, z1: {arr: [el1, el2, el3]}}: {x1: number, y1: string, z0: {n: number}, z1: {arr: number[]} }
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                         ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                              ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        interface A { x }
        namespace N {
            export class C {}
        }
        class Cls {}
        function foo(): number;
        type T = number;
        import * as all from "./x0";
        ~~~~~~
!!! error TS2667: Imports are not permitted in module augmentations. Consider moving them to the enclosing external module.
                             ~~~~~~
!!! error TS2307: Cannot find module './x0' or its corresponding type declarations.
        import {a} from "./x0";
        ~~~~~~
!!! error TS2667: Imports are not permitted in module augmentations. Consider moving them to the enclosing external module.
                        ~~~~~~
!!! error TS2307: Cannot find module './x0' or its corresponding type declarations.
        export * from "./x0";
        ~~~~~~
!!! error TS2666: Exports and export assignments are not permitted in module augmentations.
                      ~~~~~~
!!! error TS2307: Cannot find module './x0' or its corresponding type declarations.
        export {a} from "./x0";
        ~~~~~~
!!! error TS2666: Exports and export assignments are not permitted in module augmentations.
                        ~~~~~~
!!! error TS2307: Cannot find module './x0' or its corresponding type declarations.
    }
    
    declare module "./test" {
        export = N1;
        ~~~~~~
!!! error TS2666: Exports and export assignments are not permitted in module augmentations.
    }
    export {}
    
==== observable.ts (0 errors) ====
    export declare class Observable<T> {
        filter(pred: (e:T) => boolean): Observable<T>;
    }
    export var x = 1;
    
==== test.ts (0 errors) ====
    export let b = 1;
    
==== main.ts (0 errors) ====
    import { Observable } from "./observable"
    import "./x";
    