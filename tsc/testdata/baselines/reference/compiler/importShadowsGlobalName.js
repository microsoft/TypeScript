//// [tests/cases/compiler/importShadowsGlobalName.ts] ////

//// [Foo.ts]
class Foo {}
export = Foo;

//// [Bar.ts]
import Error = require('Foo');
class Bar extends Error {}
export = Bar;

//// [Bar.js]
"use strict";
const Error = require("Foo");
class Bar extends Error {
}
module.exports = Bar;
