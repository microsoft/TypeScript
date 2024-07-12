//// [tests/cases/compiler/deferredCallbacks.ts] ////

//// [deferredCallbacks.ts]
declare function immediate(cb: () => void): void;
declare function deferred1(deferred cb: () => void): void;
declare function deferred2(/** @deferred */ cb: () => void): void;
declare function deferred3(/** @deferred */ deferred cb: () => void): void;

function f01() {
    let x: string | number = "OK";
    immediate(() => {
        x = 42;
    });
    x;  // string | number
}

function f02() {
    let x: string | number = "OK";
    deferred1(() => {
        x = 42;
    });
    x;  // string
}

function f03() {
    let x: string | number = "OK";
    deferred2(() => {
        x = 42;
    });
    x;  // string
}

function f04() {
    let x: string | number = "OK";
    deferred3(() => {
        x = 42;
    });
    x;  // string
}

// Parameter is considered deferred if one or more overloads defer that parameter

declare function overloaded<T>(cb: (x: T) => T): void;
declare function overloaded<T>(cb: (x: T, y: T) => T): void;
declare function overloaded(deferred cb: (...args: any) => any): void;

function f05() {
    let x: string | number = "OK";
    overloaded(() => {
        x = 42;
    });
    x.length;
}

// deferred is permitted on a rest parameter

declare function invokeImmediate(...args: ((...args: any) => any)[]): void;
declare function invokeDeferred(deferred ...args: ((...args: any) => any)[]): void;

function f06() {
    let a = [];
    a.push("abc");
    a;  // string[]
    invokeImmediate(
        () => {
            a;  // string[]
            a.push(42);
            a;  // (string | number)[]
        },
        () => {
            a;  // string[]
            a.push(true);
            a;  // (string | boolean)[]
        }
    );
    a;  // (string | number | boolean)[]
}

function f07() {
    let a = [];
    a.push("abc");
    a;  // string[]
    invokeDeferred(
        () => {
            a;  // string[]
            a.push(42);
            a;  // (string | number)[]
        },
        () => {
            a;  // string[]
            a.push(true);
            a;  // (string | boolean)[]
        }
    );
    a;  // string[]
}

// deferred modifier must precede public/private/protected/readonly

class CC {
    constructor(deferred public readonly x: () => void) {}
}

// deferred requires parameter to have type that permits functions

declare function f10(deferred f: () => void): void;
declare function f11(deferred f: Function): void;
declare function f12(deferred f: any): void;
declare function f13(deferred f: object): void;
declare function f14(deferred f: {}): void;
declare function f15(deferred f: unknown): void;
declare function f16<T extends Function>(deferred f: T): void;
declare function f17<T extends (...args: any) => any>(deferred f: T): void;
declare function f18<T extends string | (() => void)>(deferred f: T): void;

declare function f20(deferred ...funcs: Function[]): void;
declare function f21<T extends ((...args: any) => any)[]>(deferred ...funcs: T): void;
declare function f22<T extends (string | (() => void))[]>(deferred ...funcs: T): void;
declare function f23<T extends string[] | (() => void)[]>(deferred ...funcs: T): void;
declare function f24<T extends (() => void)[]>(deferred ...funcs: T | string[]): void;

declare function f30(deferred f: { foo(): void }): void;
declare function f31(deferred f: number): void;
declare function f32(deferred ...funcs: number[]): void;

type T10 = (deferred f: () => void) => void;
type T11 = (deferred f: { (): void }) => void;
type T12 = (deferred f: Function) => void;
type T13 = (deferred f: any) => void;

type T20 = (deferred f: { foo(): void }) => void;
type T21 = (deferred f: number) => void;
type T22 = (deferred ...funcs: number[]) => void;
type T23 = { deferred x: () => void };

// deferred modifier is not captured in argument list tuples

declare function doStuff(deferred f: () => void): void;

declare function recreate<A extends unknown[], R>(f: (...args: A) => R): (...args: A) => R;
declare function recreateDeferred1<A extends unknown[], R>(f: (deferred ...args: A) => R): (...args: A) => R;
declare function recreateDeferred2<A extends unknown[], R>(f: (...args: A) => R): (deferred ...args: A) => R;

function ff1() {
    let x: string | number;
    x = 123;
    doStuff(() => {
        x = "hi";
    });
    x;  // number
}

function ff2() {
    let y: string | number;
    y = 123;
    recreate(doStuff)(() => {
        y = "hi";
    });
    y;  // string | number
}

function ff3() {
    let z: string | number;
    z = 123;
    recreateDeferred1(doStuff)(() => {
        z = "hi";
    });
    z;  // string | number
}

function ff4() {
    let z: string | number;
    z = 123;
    recreateDeferred2(doStuff)(() => {
        z = "hi";
    });
    z;  // number
}

// https://github.com/microsoft/TypeScript/issues/11498

declare function mystery(cb: () => void): void;

function fx1() {
    let x: string | number = "OK";
    x;  // string
    mystery(() => {
        x = 10;
    });
    x;  // string | number
    if (x === 10) {}
}

// https://github.com/microsoft/TypeScript/issues/15380

class Foo {
  public bar: string = "";
}

function fx2() {
  let foo: Foo | null = null;
  [1].forEach((item) => {
      foo = new Foo();
  });
  if (foo) {
      foo.bar;
  }
}

// https://github.com/microsoft/TypeScript/issues/57880

const call = (f: () => void) => f();

const fx3 = () => {
    let a: undefined | number = undefined;
    call(() => { a = 1; });
    if (a !== undefined) {
        a.toString();
    }
};

// https://github.com/microsoft/TypeScript/issues/58291

async function execute(onError: (_err: Error | undefined) => void) {
    onError(new Error("a"));
}

async function run() {
    let result: boolean = true;
    await execute(() => {
        result = false;
    });
    if (result === false) {
        console.log("error");
    }
    return result;
}


//// [deferredCallbacks.js]
"use strict";
function f01() {
    let x = "OK";
    immediate(() => {
        x = 42;
    });
    x; // string | number
}
function f02() {
    let x = "OK";
    deferred1(() => {
        x = 42;
    });
    x; // string
}
function f03() {
    let x = "OK";
    deferred2(() => {
        x = 42;
    });
    x; // string
}
function f04() {
    let x = "OK";
    deferred3(() => {
        x = 42;
    });
    x; // string
}
function f05() {
    let x = "OK";
    overloaded(() => {
        x = 42;
    });
    x.length;
}
function f06() {
    let a = [];
    a.push("abc");
    a; // string[]
    invokeImmediate(() => {
        a; // string[]
        a.push(42);
        a; // (string | number)[]
    }, () => {
        a; // string[]
        a.push(true);
        a; // (string | boolean)[]
    });
    a; // (string | number | boolean)[]
}
function f07() {
    let a = [];
    a.push("abc");
    a; // string[]
    invokeDeferred(() => {
        a; // string[]
        a.push(42);
        a; // (string | number)[]
    }, () => {
        a; // string[]
        a.push(true);
        a; // (string | boolean)[]
    });
    a; // string[]
}
// deferred modifier must precede public/private/protected/readonly
class CC {
    x;
    constructor(x) {
        this.x = x;
    }
}
function ff1() {
    let x;
    x = 123;
    doStuff(() => {
        x = "hi";
    });
    x; // number
}
function ff2() {
    let y;
    y = 123;
    recreate(doStuff)(() => {
        y = "hi";
    });
    y; // string | number
}
function ff3() {
    let z;
    z = 123;
    recreateDeferred1(doStuff)(() => {
        z = "hi";
    });
    z; // string | number
}
function ff4() {
    let z;
    z = 123;
    recreateDeferred2(doStuff)(() => {
        z = "hi";
    });
    z; // number
}
function fx1() {
    let x = "OK";
    x; // string
    mystery(() => {
        x = 10;
    });
    x; // string | number
    if (x === 10) { }
}
// https://github.com/microsoft/TypeScript/issues/15380
class Foo {
    bar = "";
}
function fx2() {
    let foo = null;
    [1].forEach((item) => {
        foo = new Foo();
    });
    if (foo) {
        foo.bar;
    }
}
// https://github.com/microsoft/TypeScript/issues/57880
const call = (f) => f();
const fx3 = () => {
    let a = undefined;
    call(() => { a = 1; });
    if (a !== undefined) {
        a.toString();
    }
};
// https://github.com/microsoft/TypeScript/issues/58291
async function execute(onError) {
    onError(new Error("a"));
}
async function run() {
    let result = true;
    await execute(() => {
        result = false;
    });
    if (result === false) {
        console.log("error");
    }
    return result;
}


//// [deferredCallbacks.d.ts]
declare function immediate(cb: () => void): void;
declare function deferred1(deferred cb: () => void): void;
declare function deferred2(/** @deferred */ cb: () => void): void;
declare function deferred3(/** @deferred */ deferred cb: () => void): void;
declare function f01(): void;
declare function f02(): void;
declare function f03(): void;
declare function f04(): void;
declare function overloaded<T>(cb: (x: T) => T): void;
declare function overloaded<T>(cb: (x: T, y: T) => T): void;
declare function overloaded(deferred cb: (...args: any) => any): void;
declare function f05(): void;
declare function invokeImmediate(...args: ((...args: any) => any)[]): void;
declare function invokeDeferred(deferred ...args: ((...args: any) => any)[]): void;
declare function f06(): void;
declare function f07(): void;
declare class CC {
    deferred readonly x: () => void;
    constructor(x: () => void);
}
declare function f10(deferred f: () => void): void;
declare function f11(deferred f: Function): void;
declare function f12(deferred f: any): void;
declare function f13(deferred f: object): void;
declare function f14(deferred f: {}): void;
declare function f15(deferred f: unknown): void;
declare function f16<T extends Function>(deferred f: T): void;
declare function f17<T extends (...args: any) => any>(deferred f: T): void;
declare function f18<T extends string | (() => void)>(deferred f: T): void;
declare function f20(deferred ...funcs: Function[]): void;
declare function f21<T extends ((...args: any) => any)[]>(deferred ...funcs: T): void;
declare function f22<T extends (string | (() => void))[]>(deferred ...funcs: T): void;
declare function f23<T extends string[] | (() => void)[]>(deferred ...funcs: T): void;
declare function f24<T extends (() => void)[]>(deferred ...funcs: T | string[]): void;
declare function f30(deferred f: {
    foo(): void;
}): void;
declare function f31(deferred f: number): void;
declare function f32(deferred ...funcs: number[]): void;
type T10 = (deferred f: () => void) => void;
type T11 = (deferred f: {
    (): void;
}) => void;
type T12 = (deferred f: Function) => void;
type T13 = (deferred f: any) => void;
type T20 = (deferred f: {
    foo(): void;
}) => void;
type T21 = (deferred f: number) => void;
type T22 = (deferred ...funcs: number[]) => void;
type T23 = {
    deferred x: () => void;
};
declare function doStuff(deferred f: () => void): void;
declare function recreate<A extends unknown[], R>(f: (...args: A) => R): (...args: A) => R;
declare function recreateDeferred1<A extends unknown[], R>(f: (deferred ...args: A) => R): (...args: A) => R;
declare function recreateDeferred2<A extends unknown[], R>(f: (...args: A) => R): (deferred ...args: A) => R;
declare function ff1(): void;
declare function ff2(): void;
declare function ff3(): void;
declare function ff4(): void;
declare function mystery(cb: () => void): void;
declare function fx1(): void;
declare class Foo {
    bar: string;
}
declare function fx2(): void;
declare const call: (f: () => void) => void;
declare const fx3: () => void;
declare function execute(onError: (_err: Error | undefined) => void): Promise<void>;
declare function run(): Promise<boolean>;
