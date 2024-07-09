//@module: commonjs
// @declaration: true
export module C {
    export class A<T>{ }
    export class B { }
    
    export function F<T>(x: T): A<B> { return null; }
    export function F2<T>(x: T): C.A<C.B> { return null; }
    export function F3<T>(x: T): C.A<C.B>[] { return null; }
    export function F4<T extends A<B>>(x: T): Array<C.A<C.B>> { return null; }

    export function F5<T>(): T { return null; }

    export function F6<T extends A<B>>(x: T): T { return null; }

    export class D<T>{

        constructor(public val: T) { }

    }
}

export var a: C.A<C.B>;

export var b = C.F;
export var c = C.F2;
export var d = C.F3;
export var e = C.F4;

export var x = (new C.D<C.A<C.B>>(new C.A<C.B>())).val;

export function f<T extends C.A<C.B>>() { }

export var g = C.F5<C.A<C.B>>();

export class h extends C.A<C.B>{ }

export interface i extends C.A<C.B> { }

export var j = C.F6;
