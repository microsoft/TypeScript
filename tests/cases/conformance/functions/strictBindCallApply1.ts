// @strict: true

declare function foo(a: number, b: string): string;

declare function overloaded(s: string): number;
declare function overloaded(n: number): string;

declare function generic<T>(x: T): T;

let f00 = foo.bind(undefined);
let f01 = foo.bind(undefined, 10);
let f02 = foo.bind(undefined, 10, "hello");
let f03 = foo.bind(undefined, 10, 20);  // Error

let f04 = overloaded.bind(undefined);  // typeof overloaded
let f05 = generic.bind(undefined);  // typeof generic

let c00 = foo.call(undefined, 10, "hello");
let c01 = foo.call(undefined, 10);  // Error
let c02 = foo.call(undefined, 10, 20);  // Error
let c03 = foo.call(undefined, 10, "hello", 30);  // Error

let a00 = foo.apply(undefined, [10, "hello"]);
let a01 = foo.apply(undefined, [10]);  // Error
let a02 = foo.apply(undefined, [10, 20]);  // Error
let a03 = foo.apply(undefined, [10, "hello", 30]);  // Error

class C {
    constructor(a: number, b: string) {}
    foo(this: this, a: number, b: string): string { return "" }
    overloaded(s: string): number;
    overloaded(n: number): string;
    overloaded(x: any): any { return <any>undefined }
    generic<T>(x: T): T { return x }
}

declare let c: C;
declare let obj: {};

let f10 = c.foo.bind(c);
let f11 = c.foo.bind(c, 10);
let f12 = c.foo.bind(c, 10, "hello");
let f13 = c.foo.bind(c, 10, 20);  // Error
let f14 = c.foo.bind(undefined);  // Error

let f15 = c.overloaded.bind(c);  // typeof C.prototype.overloaded
let f16 = c.generic.bind(c);  // typeof C.prototype.generic

let c10 = c.foo.call(c, 10, "hello");
let c11 = c.foo.call(c, 10);  // Error
let c12 = c.foo.call(c, 10, 20);  // Error
let c13 = c.foo.call(c, 10, "hello", 30);  // Error
let c14 = c.foo.call(undefined, 10, "hello");  // Error

let a10 = c.foo.apply(c, [10, "hello"]);
let a11 = c.foo.apply(c, [10]);  // Error
let a12 = c.foo.apply(c, [10, 20]);  // Error
let a13 = c.foo.apply(c, [10, "hello", 30]);  // Error
let a14 = c.foo.apply(undefined, [10, "hello"]);  // Error

let f20 = C.bind(undefined);
let f21 = C.bind(undefined, 10);
let f22 = C.bind(undefined, 10, "hello");
let f23 = C.bind(undefined, 10, 20);  // Error

C.call(c, 10, "hello");
C.call(c, 10);  // Error
C.call(c, 10, 20);  // Error
C.call(c, 10, "hello", 30);  // Error

C.apply(c, [10, "hello"]);
C.apply(c, [10]);  // Error
C.apply(c, [10, 20]);  // Error
C.apply(c, [10, "hello", 30]);  // Error
