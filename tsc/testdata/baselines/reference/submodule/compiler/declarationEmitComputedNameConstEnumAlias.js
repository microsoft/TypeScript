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
Object.defineProperty(exports, "__esModule", { value: true });
const EnumExample_1 = require("./EnumExample");
exports.default = {
    [EnumExample_1.default.TEST]: {},
};
