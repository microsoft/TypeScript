//// [tests/cases/conformance/jsdoc/jsdocLinkTag10.ts] ////

//// [a.ts]
/**
 * {@link Foo.member | static}
 * {@link Foo#member | instance}
 */
class Foo {
    static member = 123;
    member = 456;
}


//// [a.js]
"use strict";
/**
 * {@link Foo.member | static}
 * {@link Foo#member | instance}
 */
class Foo {
    constructor() {
        this.member = 456;
    }
}
Foo.member = 123;
