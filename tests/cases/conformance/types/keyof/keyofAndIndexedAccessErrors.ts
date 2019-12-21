class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

type Dictionary<T> = { [x: string]: T };

type T00 = keyof K0;  // Error

type T01 = keyof Object;
type T02 = keyof keyof Object;
type T03 = keyof keyof keyof Object;
type T04 = keyof keyof keyof keyof Object;
type T05 = keyof keyof keyof keyof keyof Object;
type T06 = keyof keyof keyof keyof keyof keyof Object;

type T10 = Shape["name"];
type T11 = Shape["foo"];  // Error
type T12 = Shape["name" | "foo"];  // Error
type T13 = Shape[any];  // Error
type T14 = Shape[string];  // Error
type T15 = Shape[number];  // Error
type T16 = Shape[boolean];  // Error
type T17 = Shape[void];  // Error
type T18 = Shape[undefined];  // Error
type T19 = Shape[{ x: string }];  // Error
type T20 = Shape[string | number];  // Error
type T21 = Shape[string & number];
type T22 = Shape[string | boolean];  // Error

type T30 = string[]["length"];
type T31 = string[][number];
type T32 = string[][string];  // Error
type T33 = string[][boolean];  // Error

type T40 = Dictionary<string>[any];
type T41 = Dictionary<string>[number];
type T42 = Dictionary<string>[string];
type T43 = Dictionary<string>[boolean];  // Error

type T50 = any[any];
type T51 = any[number];
type T52 = any[string];
type T53 = any[boolean];  // Error

type T60 = {}["toString"];
type T61 = []["toString"];

declare let cond: boolean;

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

function f10(shape: Shape) {
    let x1 = getProperty(shape, "name");
    let x2 = getProperty(shape, "size");  // Error
    let x3 = getProperty(shape, cond ? "name" : "size");  // Error
    setProperty(shape, "name", "rectangle");
    setProperty(shape, "size", 10);  // Error
    setProperty(shape, cond ? "name" : "size", 10);  // Error
}

function f20<T, U>(x: T | U, y: T & U, k1: keyof (T | U), k2: keyof T & keyof U, k3: keyof (T & U), k4: keyof T | keyof U) {
    x[k1];
    x[k2];
    x[k3];  // Error
    x[k4];  // Error

    y[k1];
    y[k2];
    y[k3];
    y[k4];

    k1 = k2;
    k1 = k3;  // Error
    k1 = k4;  // Error

    k2 = k1;
    k2 = k3;  // Error
    k2 = k4;  // Error

    k3 = k1;
    k3 = k2;
    k3 = k4;

    k4 = k1;
    k4 = k2;
    k4 = k3;
}

// Repro from #17166
function f3<T, K extends Extract<keyof T, string>, U extends T, J extends K>(
    t: T, k: K, tk: T[K], u: U, j: J, uk: U[K], tj: T[J], uj: U[J]): void {
    for (let key in t) {
        key = k // ok, K ==> keyof T
        k = key // error, keyof T =/=> K
        t[key] = tk; // ok, T[K] ==> T[keyof T]
        tk = t[key]; // error, T[keyof T] =/=> T[K]
    }
    tk = uk;
    uk = tk; // error

    tj = uj;
    uj = tj; // error

    tk = tj;
    tj = tk; // error

    tk = uj;
    uj = tk; // error
}

// The constraint of 'keyof T' is 'keyof T'
function f4<T extends { [K in keyof T]: string }>(k: keyof T) {
    k = 42; // error
    k = "hello"; // error
}

// Repro from #27470

type UndefinedKeys<T extends Record<string, any>> = {
  [K in keyof T]: undefined extends T[K] ? K : never
};

type MyType = {a: string, b: string | undefined}

type Result1 = UndefinedKeys<MyType>;

const a1: Result1['a'] = 'a';  // Error
const b1: Result1['b'] = 'b';

function test1<T extends Record<string, any>, K extends keyof T>(t: T, k: K) {
    t[k] = 42;  // Error
    t[k] = "hello";  // Error
    t[k] = [10, 20];  // Error
}

// Repro from #28839

function f30<T, K extends keyof T>() {
    let x: Partial<Record<keyof T, string>>[K] = "hello";
}

function f31<T, K extends keyof T>() {
    let x: Partial<Partial<Partial<Partial<Partial<Partial<Partial<Record<keyof T, string>>>>>>>>[K] = "hello";
}
