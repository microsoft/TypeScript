//// [tests/cases/compiler/deleteExpressionMustBeOptional.ts] ////

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

interface AA {
    [s: string]: number
}

type BB = {
    [P in keyof any]: number
}

declare const f: Foo
declare const a: AA
declare const b: BB

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

delete a.a
delete a.b

delete b.a
delete b.b


//// [deleteExpressionMustBeOptional.js]
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
delete a.a;
delete a.b;
delete b.a;
delete b.b;
