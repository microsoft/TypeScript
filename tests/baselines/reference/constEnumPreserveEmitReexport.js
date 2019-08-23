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
exports.__esModule = true;
var ConstEnum_1 = require("./ConstEnum");
exports["default"] = ConstEnum_1.MyConstEnum;
