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
/** @see {Foo} foooo*/
var a = "";
/** @see {NS.Bar} ns.bar*/
var b = "";
/** @see {b} b */
var c = "";


//// [seeTag1.d.ts]
interface Foo {
    foo: string;
}
declare namespace NS {
    interface Bar {
        baz: Foo;
    }
}
/** @see {Foo} foooo*/
declare const a = "";
/** @see {NS.Bar} ns.bar*/
declare const b = "";
/** @see {b} b */
declare const c = "";
