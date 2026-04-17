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
"use strict";
const Strings = {
    a: "A",
    b: "B"
};
class Foo {
}
module.exports = Foo;
module.exports.Strings = Strings;


//// [cls.d.ts]
declare const Strings: {
    a: string;
    b: string;
};
declare class Foo {
}
export = Foo;
export { Strings };
