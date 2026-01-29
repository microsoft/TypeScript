//// [tests/cases/compiler/declarationEmitComputedNameConstEnumAlias.ts] ////

//// [EnumExample.ts]
enum EnumExample {
    TEST = 'TEST',
}

export default EnumExample;

//// [index.ts]
import EnumExample from './EnumExample';

export default {
    [EnumExample.TEST]: {},
};

//// [EnumExample.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumExample;
(function (EnumExample) {
    EnumExample["TEST"] = "TEST";
})(EnumExample || (EnumExample = {}));
exports.default = EnumExample;
//// [index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnumExample_1 = __importDefault(require("./EnumExample"));
exports.default = {
    [EnumExample_1.default.TEST]: {},
};


//// [EnumExample.d.ts]
declare enum EnumExample {
    TEST = "TEST"
}
export default EnumExample;
//// [index.d.ts]
declare const _default: {
    TEST: {};
};
export default _default;
