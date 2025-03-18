//// [tests/cases/conformance/es6/moduleExportsAmd/decoratedDefaultExportsGetExportedAmd.ts] ////

//// [a.ts]
var decorator: ClassDecorator;

@decorator
export default class Foo {}

//// [b.ts]
var decorator: ClassDecorator;

@decorator
export default class {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator;
@decorator
class Foo {
}
exports.default = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator;
@decorator
class default_1 {
}
exports.default = default_1;
