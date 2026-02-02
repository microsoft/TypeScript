//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance1.ts] ////

//// [index.js]
class Foo {}

module.exports = new Foo();

//// [index.js]
class Foo {
}
module.exports = new Foo();


//// [index.d.ts]
declare const _exports: Foo;
export = _exports;
declare class Foo {
}
