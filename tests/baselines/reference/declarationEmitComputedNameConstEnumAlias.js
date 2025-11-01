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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var EnumExample_1 = require("./EnumExample");
exports.default = (_a = {},
    _a[EnumExample_1.default.TEST] = {},
    _a);


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
