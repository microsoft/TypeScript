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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyConstEnum = void 0;
var MyConstEnum;
(function (MyConstEnum) {
    MyConstEnum[MyConstEnum["Foo"] = 0] = "Foo";
    MyConstEnum[MyConstEnum["Bar"] = 1] = "Bar";
})(MyConstEnum || (exports.MyConstEnum = MyConstEnum = {}));
;
//// [ImportExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstEnum_1 = require("./ConstEnum");
exports.default = ConstEnum_1.MyConstEnum;
//// [ReExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var ConstEnum_1 = require("./ConstEnum");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return ConstEnum_1.MyConstEnum; } });
