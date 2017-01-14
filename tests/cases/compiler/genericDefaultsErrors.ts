// @declaration: true

declare const x: any;

declare function f00<T = T>(): void;
declare function f01<T = U, U = T>(): void;
declare function f02<T = U, U>();
declare function f03<T extends string = number>(): void;
declare function f04<T extends string, U extends number = T>(): void;
declare function f05<T, U extends number = T>(): void;
declare function f06<T, U extends T = number>(): void;

declare function f07<T, U, V = number>(): void;
f07(); // ok
f07<1>(); // error
f07<1, 2>(); // ok
f07<1, 2, 3>(); // ok
f07<1, 2, 3, 4>(); // error

interface i00<T> { }
interface i00<T = number> { }

interface i01<T = number> { }
interface i01<T = string> { }

interface i02<T = T> { }
interface i03<T = U, U = T> { }
interface i04<T = U, U> { }
interface i05<T extends string = number> { }
interface i06<T extends string, U extends number = T> { }
interface i07<T, U extends number = T> { }
interface i08<T, U extends T = number> { }

interface i09<T, U, V = number> { }
type i09t00 = i09; // error
type i09t01 = i09<1>; // error
type i09t02 = i09<1, 2>; // ok
type i09t03 = i09<1, 2, 3>; // ok
type i09t04 = i09<1, 2, 3, 4>; // error