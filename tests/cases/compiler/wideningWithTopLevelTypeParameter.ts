// @strict: true
// @noEmit: true

type C1<T> = T extends unknown ? T | undefined : never;
type C2<T> = T extends unknown ? T | undefined : never;
type C3<T> = T extends unknown ? T | undefined : never;
type C4<T> = T extends unknown ? T | undefined : never;

declare function f0<T>(x: T): [T];
declare function f1<T>(x: C1<T>): [T];
declare function f2<T>(x: C1<C2<T>>): [T];
declare function f3<T>(x: C1<C2<C3<T>>>): [T];
declare function f4<T>(x: C1<C2<C3<C4<T>>>>): [T];

const c0 = f0(7);  // [number]
const c1 = f1(7);  // [number]
const c2 = f2(7);  // [number]
const c3 = f3(7);  // [number]
const c4 = f4(7);  // [7] since we have an internal nesting limit of 3

// Repro from #52620

class FormControl<T> {
    constructor(t: T extends undefined ? never : T) {}
}

const a = new FormControl('');  // string

class FormControl2<T> {
    constructor(t: T | string) {}
}

const b = new FormControl2('');  // string

class FormControl3<T> {
    constructor(t: T extends undefined ? never : T | string) {}
}

const c = new FormControl3('');  // string
