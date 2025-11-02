//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassExtendsVisibility.ts] ////

//// [bar.js]
class Bar {}
module.exports = Bar;
//// [cls.js]
const Bar = require("./bar");
const Strings = {
    a: "A",
    b: "B"
};
class Foo extends Bar {}
module.exports = Foo;
module.exports.Strings = Strings;

//// [bar.js]
class Bar {
}
module.exports = Bar;
//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bar = require("./bar");
const Strings = {
    a: "A",
    b: "B"
};
class Foo extends Bar {
}
module.exports = Foo;
export var Strings = Strings;
module.exports.Strings = Strings;


//// [bar.d.ts]
export = Bar;
//// [cls.d.ts]
export = Foo;
export declare var Strings: {
    a: string;
    b: string;
};
