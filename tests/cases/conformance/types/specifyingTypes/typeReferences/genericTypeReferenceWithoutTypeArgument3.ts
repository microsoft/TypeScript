// it is an error to use a generic type without type arguments
// all of these are errors 

declare class C<T> {
    foo: T;
}

declare var c: C;

declare var a: { x: C };
declare var b: { (x: C): C };
declare var d: { [x: C]: C };

declare function f(x: C): C;

declare class D extends C {}

declare module M {
    export class E<T> { foo: T }
}

declare class D2 extends M.C { }
declare class D3<T extends M.E> { }

declare function h<T extends C>(x: T);
declare function i<T extends M.E>(x: T);