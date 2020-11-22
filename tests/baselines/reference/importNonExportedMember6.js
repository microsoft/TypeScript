//// [tests/cases/compiler/importNonExportedMember6.ts] ////

//// [a.ts]
class Foo {}
export = Foo;

//// [b.ts]
import { Foo } from './a';

//// [a.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
export {};
//// [b.js]
export {};
