//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance3.ts] ////

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}

module.exports = new Foo();

module.exports.additional = 20;

//// [index.js]
"use strict";
class Foo {
    constructor() {
        this.member = 10;
    }
}
Foo.stat = 10;
module.exports = new Foo();
module.exports.additional = 20;


//// [index.d.ts]
declare const _exports: Foo;
export = _exports;
declare namespace _exports {
    export var additional: 20;
}
declare class Foo {
    static stat: number;
    member: number;
}
