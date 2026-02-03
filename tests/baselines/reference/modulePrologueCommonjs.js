//// [tests/cases/compiler/modulePrologueCommonjs.ts] ////

//// [modulePrologueCommonjs.ts]
"use strict";

export class Foo {}

//// [modulePrologueCommonjs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
