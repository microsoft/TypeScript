//// [tests/cases/compiler/classVarianceResolveCircularity2.ts] ////

//// [classVarianceResolveCircularity2.ts]
// Issue #52813

export {};

class Bar<T> {
    num!: number;
    Value = callme(new Foo(this)).bar.num;
    Field: number = callme(new Foo(this)).bar.num;
}
declare function callme(x: Foo<any>): Foo<any>;
declare function callme(x: object): string;

class Foo<T> {
    bar!: Bar<T>;
    constructor(bar: Bar<T>) {
        this.bar = bar;
    }
}

//// [classVarianceResolveCircularity2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bar {
    num;
    Value = callme(new Foo(this)).bar.num;
    Field = callme(new Foo(this)).bar.num;
}
class Foo {
    bar;
    constructor(bar) {
        this.bar = bar;
    }
}
