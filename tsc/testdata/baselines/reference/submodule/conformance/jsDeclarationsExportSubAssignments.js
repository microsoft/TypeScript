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
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = {
    a: "A",
    b: "B"
};
class Foo {
}
module.exports = Foo;
export var Strings = Strings;
module.exports.Strings = Strings;


//// [cls.d.ts]
export = Foo;
export declare var Strings: {
    a: string;
    b: string;
};
