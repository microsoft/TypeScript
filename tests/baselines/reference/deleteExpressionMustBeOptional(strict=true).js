//// [deleteExpressionMustBeOptional.ts]
interface Foo {
    a: number
    b: number | undefined
    c: number | null
    d?: number
    e: number | undefined | null
    f?: number | undefined | null
    g: unknown
    h: any
    i: never
}

declare const f: Foo

delete f.a
delete f.b
delete f.c
delete f.d
delete f.e
delete f.f
delete f.g
delete f.h
delete f.i
delete f.j

//// [deleteExpressionMustBeOptional.js]
"use strict";
delete f.a;
delete f.b;
delete f.c;
delete f.d;
delete f.e;
delete f.f;
delete f.g;
delete f.h;
delete f.i;
delete f.j;
