// @declaration: true

interface Foo {
    foo: string
}

namespace NS {
    export interface Bar {
        baz: Foo
    }
}

/** @see {Foo} foooo*/
const a = ""

/** @see {NS.Bar} ns.bar*/
const b = ""

/** @see {b} b */
const c = ""
