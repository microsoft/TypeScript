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
    constructor() {
        this.member = 10;
    }
}
Foo.stat = 10;
module.exports = new Foo();
module.exports.additional = 20;


//// [index.d.ts]
export let member: number;
export let additional: 20;
