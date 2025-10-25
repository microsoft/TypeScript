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
    let ConstFooEnum;
    (function (ConstFooEnum) {
        ConstFooEnum[ConstFooEnum["Some"] = 0] = "Some";
        ConstFooEnum[ConstFooEnum["Values"] = 1] = "Values";
        ConstFooEnum[ConstFooEnum["Here"] = 2] = "Here";
    })(ConstFooEnum = ConstEnumOnlyModule.ConstFooEnum || (ConstEnumOnlyModule.ConstFooEnum = {}));
})(ConstEnumOnlyModule || (exports.ConstEnumOnlyModule = ConstEnumOnlyModule = {}));
//// [reexport.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
const Foo = __importStar(require("./foo"));
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
