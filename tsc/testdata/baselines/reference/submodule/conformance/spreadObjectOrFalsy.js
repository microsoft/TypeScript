//// [tests/cases/conformance/types/spread/spreadObjectOrFalsy.ts] ////

//// [spreadObjectOrFalsy.ts]
function f1<T>(a: T & undefined) {
    return { ...a };  // Error
}

function f2<T>(a: T | T & undefined) {
    return { ...a };
}

function f3<T extends undefined>(a: T) {
    return { ...a };  // Error
}

function f4<T extends undefined>(a: object | T) {
    return { ...a };
}

function f5<S, T extends undefined>(a: S | T) {
    return { ...a };
}

function f6<T extends object | undefined>(a: T) {
    return { ...a };
}

// Repro from #46976

function g1<T extends {}, A extends { z: (T | undefined) & T }>(a: A) {
    const { z } = a;
    return {
        ...z
    };
}

// Repro from #47028

interface DatafulFoo<T> {
    data: T;
}

class Foo<T extends string> {
    data: T | undefined;
    bar() {
        if (this.hasData()) {
            this.data.toLocaleLowerCase();
        }
    }
    hasData(): this is DatafulFoo<T> {
        return true;
    }
}


//// [spreadObjectOrFalsy.js]
"use strict";
function f1(a) {
    return Object.assign({}, a); // Error
}
function f2(a) {
    return Object.assign({}, a);
}
function f3(a) {
    return Object.assign({}, a); // Error
}
function f4(a) {
    return Object.assign({}, a);
}
function f5(a) {
    return Object.assign({}, a);
}
function f6(a) {
    return Object.assign({}, a);
}
// Repro from #46976
function g1(a) {
    const { z } = a;
    return Object.assign({}, z);
}
class Foo {
    data;
    bar() {
        if (this.hasData()) {
            this.data.toLocaleLowerCase();
        }
    }
    hasData() {
        return true;
    }
}


//// [spreadObjectOrFalsy.d.ts]
declare function f1<T>(a: T & undefined): any;
declare function f2<T>(a: T | (T & undefined)): T | (T & undefined);
declare function f3<T extends undefined>(a: T): any;
declare function f4<T extends undefined>(a: object | T): {};
declare function f5<S, T extends undefined>(a: S | T): S | T;
declare function f6<T extends object | undefined>(a: T): T;
declare function g1<T extends {}, A extends {
    z: (T | undefined) & T;
}>(a: A): T;
interface DatafulFoo<T> {
    data: T;
}
declare class Foo<T extends string> {
    data: T | undefined;
    bar(): void;
    hasData(): this is DatafulFoo<T>;
}
