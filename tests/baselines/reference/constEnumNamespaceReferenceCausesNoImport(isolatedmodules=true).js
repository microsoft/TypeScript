//// [tests/cases/compiler/constEnumNamespaceReferenceCausesNoImport.ts] ////

//// [foo.ts]
export const enum ConstFooEnum {
    Some,
    Values,
    Here
};
export function fooFunc(): void { /* removed */ }
//// [index.ts]
import * as Foo from "./foo";

function check(x: Foo.ConstFooEnum): void {
  switch (x) {
    case Foo.ConstFooEnum.Some:
      break;
  }
}

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstFooEnum = void 0;
exports.fooFunc = fooFunc;
var ConstFooEnum;
(function (ConstFooEnum) {
    ConstFooEnum[ConstFooEnum["Some"] = 0] = "Some";
    ConstFooEnum[ConstFooEnum["Values"] = 1] = "Values";
    ConstFooEnum[ConstFooEnum["Here"] = 2] = "Here";
})(ConstFooEnum || (exports.ConstFooEnum = ConstFooEnum = {}));
;
function fooFunc() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = require("./foo");
function check(x) {
    switch (x) {
        case Foo.ConstFooEnum.Some:
            break;
    }
}
