// @strict: true
// @noEmit: true

type IsArray<T> = T extends unknown[] ? true : false;

function f1<T extends object>(x: IsArray<T>) {
    let t: true = x;   // Error
    let f: false = x;  // Error
}

function f2<T extends unknown[]>(x: IsArray<T>) {
    let t: true = x;
    let f: false = x;  // Error
}

function f3<T extends string[]>(x: IsArray<T>) {
    let t: true = x;
    let f: false = x;  // Error
}

function f4<T extends Function>(x: IsArray<T>) {
    let t: true = x;   // Error
    let f: false = x;
}

type ZeroOf<T> =
    T extends null ? null :
    T extends undefined ? undefined :
    T extends string ? "" :
    T extends number ? 0 :
    T extends boolean ? false :
    never;

function f10<T extends {}>(x: ZeroOf<T>) {
    let t: "" | 0 | false = x;
}

type Foo<T> = T extends "abc" | 42 ? true : false;

function f20<T extends string>(x: Foo<T>) {
    let t: false = x;  // Error
}

// Modified repro from #30152

interface A { foo(): void; }
interface B { bar(): void; }
interface C { foo(): void, bar(): void }

function test1<T extends A>(y: T extends B ? number : string) {
    if (typeof y == 'string') {
        y;  // T extends B ? number : string
    }
    else {
        y;  // never
    }
    const newY: string | number = y;
    newY;  // string
}

function test2<T extends A>(y: T extends B ? string : number) {
    if (typeof y == 'string') {
        y;  // never
    }
    else {
        y;  // T extends B ? string : number
    }
    const newY: string | number = y;
    newY;  // number 
}

function test3<T extends A>(y: T extends C ? number : string) {
    if (typeof y == 'string') {
        y;  // (T extends C ? number : string) & string
    }
    else {
        y;  // T extends C ? number : string
    }
    const newY: string | number = y;
    newY;  // string | number
}

function test4<T extends A>(y: T extends C ? string : number) {
    if (typeof y == 'string') {
        y;  // (T extends C ? string : number) & string
    }
    else {
        y;  // T extends C ? string : number
    }
    const newY: string | number = y;
    newY;  // string | number
}
