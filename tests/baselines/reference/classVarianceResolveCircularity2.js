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
// Issue #52813
Object.defineProperty(exports, "__esModule", { value: true });
class Bar {
    constructor() {
        this.Value = callme(new Foo(this)).bar.num;
        this.Field = callme(new Foo(this)).bar.num;
    }
}
class Foo {
    constructor(bar) {
        this.bar = bar;
    }
}
