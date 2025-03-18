//// [tests/cases/conformance/jsdoc/seeTag1.ts] ////

//// [seeTag1.ts]
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


//// [seeTag1.js]
const a = "";
const b = "";
const c = "";
