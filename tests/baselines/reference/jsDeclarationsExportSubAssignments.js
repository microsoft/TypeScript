//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportSubAssignments.ts] ////

//// [cls.js]
const Strings = {
    a: "A",
    b: "B"
};
class Foo {}
module.exports = Foo;
module.exports.Strings = Strings;

//// [cls.js]
var Strings = {
    a: "A",
    b: "B"
};
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
module.exports.Strings = Strings;


//// [cls.d.ts]
export = Foo;
declare class Foo {
}
declare namespace Foo {
    export { Strings };
}
declare namespace Strings {
    let a: string;
    let b: string;
}
