//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance3.ts] ////

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}

module.exports = new Foo();

module.exports.additional = 20;

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}
module.exports = new Foo();
export var additional = 20;
module.exports.additional = 20;


//// [index.d.ts]
declare class Foo {
    static stat: number;
    member: number;
}
declare const _default: Foo;
export = _default;
export declare var additional: number;
