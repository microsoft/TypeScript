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
export declare class Foo {
    constructor();
    slicey(): void;
    m(): void;
}
