//// [mappedTypes6.ts]
type T00<T> = { [P in keyof T]: T[P] };
type T01<T> = { [P in keyof T]?: T[P] };
type T02<T> = { [P in keyof T]+?: T[P] };
type T03<T> = { [P in keyof T]-?: T[P] };

type T04<T> = { readonly [P in keyof T]: T[P] };
type T05<T> = { readonly [P in keyof T]?: T[P] };
type T06<T> = { readonly [P in keyof T]+?: T[P] };
type T07<T> = { readonly [P in keyof T]-?: T[P] };

type T08<T> = { +readonly [P in keyof T]: T[P] };
type T09<T> = { +readonly [P in keyof T]?: T[P] };
type T10<T> = { +readonly [P in keyof T]+?: T[P] };
type T11<T> = { +readonly [P in keyof T]-?: T[P] };

type T12<T> = { -readonly [P in keyof T]: T[P] };
type T13<T> = { -readonly [P in keyof T]?: T[P] };
type T14<T> = { -readonly [P in keyof T]+?: T[P] };
type T15<T> = { -readonly [P in keyof T]-?: T[P] };

function f1<T>(x: Required<T>, y: T, z: Partial<T>) {
    x = x;
    x = y;  // Error
    x = z;  // Error
    y = x;
    y = y;
    y = z;  // Error
    z = x;
    z = y;
    z = z;
}

type Denullified<T> = { [P in keyof T]-?: NonNullable<T[P]> };

function f2<T>(w: Denullified<T>, x: Required<T>, y: T, z: Partial<T>) {
    w = w;
    w = x;  // Error
    w = y;  // Error
    w = z;  // Error
    x = w;
    x = x;
    x = y;  // Error
    x = z;  // Error
    y = w;
    y = x;
    y = y;
    y = z;  // Error
    z = w;
    z = x;
    z = y;
    z = z;
}


function f3<T>(w: Denullified<T>, x: Required<T>, y: T, z: Partial<T>) {
    w = {};  // Error
    x = {};  // Error
    y = {};  // Error
    z = {};
}

type Readwrite<T> = {
    -readonly [P in keyof T]: T[P];
}

function f10<T>(x: Readonly<T>, y: T, z: Readwrite<T>) {
    x = x;
    x = y;
    x = z;
    y = x;
    y = y;
    y = z;
    z = x;
    z = y;
    z = z;
}

type Foo = {
    a: number;
    b: number | undefined;
    c?: number;
    d?: number | undefined;
}

declare let x1: Foo;

x1.a;  // number
x1.b;  // number | undefined
x1.c;  // number | undefined
x1.d;  // number | undefined

x1 = { a: 1 };  // Error
x1 = { a: 1, b: 1 };
x1 = { a: 1, b: 1, c: 1 };
x1 = { a: 1, b: 1, c: 1, d: 1 };

declare let x2: Required<Foo>;

x1.a;  // number
x1.b;  // number | undefined
x1.c;  // number
x1.d;  // number

x2 = { a: 1 };  // Error
x2 = { a: 1, b: 1 };  // Error
x2 = { a: 1, b: 1, c: 1 };  // Error
x2 = { a: 1, b: 1, c: 1, d: 1 };

type Bar = {
    a: number;
    readonly b: number;
}

declare let x3: Bar;
x3.a = 1;
x3.b = 1;  // Error

declare let x4: Readonly<Bar>;
x4.a = 1;  // Error
x4.b = 1;  // Error

declare let x5: Readwrite<Bar>;
x5.a = 1;
x5.b = 1;


//// [mappedTypes6.js]
"use strict";
function f1(x, y, z) {
    x = x;
    x = y; // Error
    x = z; // Error
    y = x;
    y = y;
    y = z; // Error
    z = x;
    z = y;
    z = z;
}
function f2(w, x, y, z) {
    w = w;
    w = x; // Error
    w = y; // Error
    w = z; // Error
    x = w;
    x = x;
    x = y; // Error
    x = z; // Error
    y = w;
    y = x;
    y = y;
    y = z; // Error
    z = w;
    z = x;
    z = y;
    z = z;
}
function f3(w, x, y, z) {
    w = {}; // Error
    x = {}; // Error
    y = {}; // Error
    z = {};
}
function f10(x, y, z) {
    x = x;
    x = y;
    x = z;
    y = x;
    y = y;
    y = z;
    z = x;
    z = y;
    z = z;
}
x1.a; // number
x1.b; // number | undefined
x1.c; // number | undefined
x1.d; // number | undefined
x1 = { a: 1 }; // Error
x1 = { a: 1, b: 1 };
x1 = { a: 1, b: 1, c: 1 };
x1 = { a: 1, b: 1, c: 1, d: 1 };
x1.a; // number
x1.b; // number | undefined
x1.c; // number
x1.d; // number
x2 = { a: 1 }; // Error
x2 = { a: 1, b: 1 }; // Error
x2 = { a: 1, b: 1, c: 1 }; // Error
x2 = { a: 1, b: 1, c: 1, d: 1 };
x3.a = 1;
x3.b = 1; // Error
x4.a = 1; // Error
x4.b = 1; // Error
x5.a = 1;
x5.b = 1;


//// [mappedTypes6.d.ts]
declare type T00<T> = {
    [P in keyof T]: T[P];
};
declare type T01<T> = {
    [P in keyof T]?: T[P];
};
declare type T02<T> = {
    [P in keyof T]+?: T[P];
};
declare type T03<T> = {
    [P in keyof T]-?: T[P];
};
declare type T04<T> = {
    readonly [P in keyof T]: T[P];
};
declare type T05<T> = {
    readonly [P in keyof T]?: T[P];
};
declare type T06<T> = {
    readonly [P in keyof T]+?: T[P];
};
declare type T07<T> = {
    readonly [P in keyof T]-?: T[P];
};
declare type T08<T> = {
    +readonly [P in keyof T]: T[P];
};
declare type T09<T> = {
    +readonly [P in keyof T]?: T[P];
};
declare type T10<T> = {
    +readonly [P in keyof T]+?: T[P];
};
declare type T11<T> = {
    +readonly [P in keyof T]-?: T[P];
};
declare type T12<T> = {
    -readonly [P in keyof T]: T[P];
};
declare type T13<T> = {
    -readonly [P in keyof T]?: T[P];
};
declare type T14<T> = {
    -readonly [P in keyof T]+?: T[P];
};
declare type T15<T> = {
    -readonly [P in keyof T]-?: T[P];
};
declare function f1<T>(x: Required<T>, y: T, z: Partial<T>): void;
declare type Denullified<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};
declare function f2<T>(w: Denullified<T>, x: Required<T>, y: T, z: Partial<T>): void;
declare function f3<T>(w: Denullified<T>, x: Required<T>, y: T, z: Partial<T>): void;
declare type Readwrite<T> = {
    -readonly [P in keyof T]: T[P];
};
declare function f10<T>(x: Readonly<T>, y: T, z: Readwrite<T>): void;
declare type Foo = {
    a: number;
    b: number | undefined;
    c?: number;
    d?: number | undefined;
};
declare let x1: Foo;
declare let x2: Required<Foo>;
declare type Bar = {
    a: number;
    readonly b: number;
};
declare let x3: Bar;
declare let x4: Readonly<Bar>;
declare let x5: Readwrite<Bar>;
