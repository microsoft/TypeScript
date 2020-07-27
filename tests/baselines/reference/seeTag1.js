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


//// [seeTag1.js]
/** @see {Foo} foooo*/
var a = "";
/** @see {NS.Bar} ns.bar*/
var b = "";


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
