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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["BAR"] = 0] = "BAR";
})(Foo || (exports.Foo = Foo = {}));
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file2_1 = require("./file2");
console.log(file2_1.Foo.BAR);
