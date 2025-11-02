//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance2.ts] ////

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}

module.exports = new Foo();

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}
module.exports = new Foo();


//// [index.d.ts]
declare class Foo {
    static stat: number;
    member: number;
}
declare const _default: Foo;
export = _default;
