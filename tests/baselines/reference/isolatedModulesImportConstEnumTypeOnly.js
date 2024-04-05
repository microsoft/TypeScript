//// [tests/cases/compiler/isolatedModulesImportConstEnumTypeOnly.ts] ////

//// [enum.ts]
export const enum Foo { Bar }

//// [index.ts]
import { Foo } from "./enum";
function f(foo: Foo) { return; }


//// [enum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["Bar"] = 0] = "Bar";
})(Foo || (exports.Foo = Foo = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f(foo) { return; }
