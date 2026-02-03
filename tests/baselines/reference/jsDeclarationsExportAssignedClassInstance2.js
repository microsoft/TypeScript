//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassInstance2.ts] ////

//// [index.js]
class Foo {
    static stat = 10;
    member = 10;
}

module.exports = new Foo();

//// [index.js]
let Foo = (() => {
    class Foo {
        constructor() {
            this.member = 10;
        }
    }
    Foo.stat = 10;
    return Foo;
})();
module.exports = new Foo();


//// [index.d.ts]
declare const _exports: Foo;
export = _exports;
declare class Foo {
    static stat: number;
    member: number;
}
