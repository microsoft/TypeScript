// @strictNullChecks: true
// @exactOptionalPropertyTypes: true, false

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
declare const g: Partial<Foo>
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

delete g.a
delete g.b
delete g.c
delete g.d
delete g.e
delete g.f
delete g.g
delete g.h
delete g.i
delete g.j

delete a.a
delete a.b

delete b.a
delete b.b
