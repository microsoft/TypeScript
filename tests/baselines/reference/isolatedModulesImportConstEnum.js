//// [tests/cases/compiler/isolatedModulesImportConstEnum.ts] ////

//// [file1.ts]
import { Foo } from './file2';
console.log(Foo.BAR);

//// [file2.ts]
export const enum Foo {
  BAR,
}


//// [file2.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["BAR"] = 0] = "BAR";
})(Foo = exports.Foo || (exports.Foo = {}));
//// [file1.js]
"use strict";
exports.__esModule = true;
var file2_1 = require("./file2");
console.log(file2_1.Foo.BAR);
