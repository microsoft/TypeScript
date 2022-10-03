module M {
    export export var x = 1;
    export export function f() { }

    export export module N {
        export export class C { }
        export export interface I { }
    }  
}

declare module A {
    export export var x;
    export export function f()

    export export module N {
        export export class C { }
        export export interface I { }
    }
}