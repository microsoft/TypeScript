//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance1.ts] ////

//// [index.js]
class Foo {}

module.exports = new Foo();

//// [index.js]
class Foo {
}
module.exports = new Foo();


//// [index.d.ts]
declare class Foo {
}
declare const _default: Foo;
export = _default;
