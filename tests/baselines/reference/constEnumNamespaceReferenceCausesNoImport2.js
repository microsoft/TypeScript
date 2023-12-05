//// [tests/cases/compiler/constEnumNamespaceReferenceCausesNoImport2.ts] ////

//// [foo.ts]
export module ConstEnumOnlyModule {
  export const enum ConstFooEnum {
    Some,
    Values,
    Here
  }
}

//// [reexport.ts]
import * as Foo from "./foo";
export = Foo.ConstEnumOnlyModule;

//// [index.ts]
import Foo = require("./reexport");
function check(x: Foo.ConstFooEnum): void {
  switch (x) {
    case Foo.ConstFooEnum.Some:
      break;
  }
}

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstEnumOnlyModule = void 0;
var ConstEnumOnlyModule;
(function (ConstEnumOnlyModule) {
    var ConstFooEnum;
    (function (ConstFooEnum) {
        ConstFooEnum[ConstFooEnum["Some"] = 0] = "Some";
        ConstFooEnum[ConstFooEnum["Values"] = 1] = "Values";
        ConstFooEnum[ConstFooEnum["Here"] = 2] = "Here";
    })(ConstFooEnum = ConstEnumOnlyModule.ConstFooEnum || (ConstEnumOnlyModule.ConstFooEnum = {}));
})(ConstEnumOnlyModule || (exports.ConstEnumOnlyModule = ConstEnumOnlyModule = {}));
//// [reexport.js]
"use strict";
var Foo = require("./foo");
module.exports = Foo.ConstEnumOnlyModule;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function check(x) {
    switch (x) {
        case 0 /* Foo.ConstFooEnum.Some */:
            break;
    }
}
