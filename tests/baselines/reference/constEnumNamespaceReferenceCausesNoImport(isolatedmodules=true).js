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
exports.__esModule = true;
exports.fooFunc = exports.ConstFooEnum = void 0;
var ConstFooEnum;
(function (ConstFooEnum) {
    ConstFooEnum[ConstFooEnum["Some"] = 0] = "Some";
    ConstFooEnum[ConstFooEnum["Values"] = 1] = "Values";
    ConstFooEnum[ConstFooEnum["Here"] = 2] = "Here";
})(ConstFooEnum = exports.ConstFooEnum || (exports.ConstFooEnum = {}));
;
function fooFunc() { }
exports.fooFunc = fooFunc;
//// [index.js]
"use strict";
exports.__esModule = true;
var Foo = require("./foo");
function check(x) {
    switch (x) {
        case Foo.ConstFooEnum.Some:
            break;
    }
}
