//// [tests/cases/conformance/salsa/thisPropertyAssignmentCircular.ts] ////

//// [thisPropertyAssignmentCircular.js]
export class Foo {
    constructor() {
        this.foo = "Hello";
    }
    slicey() {
        this.foo = this.foo.slice();
    }
    m() {
        this.foo
    }
}

/** @class */
function C() {
    this.x = 0;
    this.x = function() { this.x.toString(); }
}




//// [thisPropertyAssignmentCircular.d.ts]
export class Foo {
    foo: string;
    slicey(): void;
    m(): void;
}
