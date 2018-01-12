//// [genericDefaultsErrors.ts]
declare const x: any;

declare function f03<T extends string = number>(): void; // error
declare function f04<T extends string, U extends number = T>(): void; // error
declare function f05<T, U extends number = T>(): void; // error
declare function f06<T, U extends T = number>(): void; // error

declare function f11<T, U, V = number>(): void;
f11(); // ok
f11<1>(); // error
f11<1, 2>(); // ok
f11<1, 2, 3>(); // ok
f11<1, 2, 3, 4>(); // error

declare function f12<T, U = T>(a?: U): void;
f12<number>(); // ok
f12<number>("a"); // error

interface i00<T> { } // ok
interface i00<U = number> { } // error

interface i01<T = number> { } // ok
interface i01<T = string> { } // error

interface i04<T = number, U> { } // error
interface i05<T extends string = number> { } // error
interface i06<T extends string, U extends number = T> { } // error
interface i07<T, U extends number = T> { } // error
interface i08<T, U extends T = number> { } // error

interface i09<T, U, V = number> { }
type i09t00 = i09; // error
type i09t01 = i09<1>; // error
type i09t02 = i09<1, 2>; // ok
type i09t03 = i09<1, 2, 3>; // ok
type i09t04 = i09<1, 2, 3, 4>; // error

interface i10 { x: T; } // error
interface i10<T = number> {}

// https://github.com/Microsoft/TypeScript/issues/16221
interface SelfReference<T = SelfReference> {}

//// [genericDefaultsErrors.js]
f11(); // ok
f11(); // error
f11(); // ok
f11(); // ok
f11(); // error
f12(); // ok
f12("a"); // error
