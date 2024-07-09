//// [tests/cases/compiler/importNonExportedMember5.ts] ////

//// [a.ts]
class Foo {}
export = Foo;

//// [b.ts]
import { Foo } from './a';

//// [a.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
