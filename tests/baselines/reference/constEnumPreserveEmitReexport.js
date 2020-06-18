//// [tests/cases/compiler/constEnumPreserveEmitReexport.ts] ////

//// [ConstEnum.ts]
export const enum MyConstEnum {
    Foo,
    Bar
};
//// [ImportExport.ts]
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
//// [ReExport.ts]
export { MyConstEnum as default } from './ConstEnum';

//// [ConstEnum.js]
"use strict";
exports.__esModule = true;
exports.MyConstEnum = void 0;
var MyConstEnum;
(function (MyConstEnum) {
    MyConstEnum[MyConstEnum["Foo"] = 0] = "Foo";
    MyConstEnum[MyConstEnum["Bar"] = 1] = "Bar";
})(MyConstEnum = exports.MyConstEnum || (exports.MyConstEnum = {}));
;
//// [ImportExport.js]
"use strict";
exports.__esModule = true;
var ConstEnum_1 = require("./ConstEnum");
exports["default"] = ConstEnum_1.MyConstEnum;
//// [ReExport.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports["default"] = void 0;
var ConstEnum_1 = require("./ConstEnum");
__createBinding(exports, ConstEnum_1, "MyConstEnum", "default");
