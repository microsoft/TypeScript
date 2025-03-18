//// [tests/cases/compiler/constEnumNoEmitReexport.ts] ////

//// [ConstEnum.ts]
export const enum MyConstEnum {
    Foo,
    Bar
};
//// [ImportExport.ts]
import { MyConstEnum } from './ConstEnum';
export { MyConstEnum };
//// [ImportExportDefault.ts]
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
//// [ReExportDefault.ts]
export { MyConstEnum as default } from './ConstEnum';
//// [ReExport.ts]
export { MyConstEnum } from './ConstEnum';
//// [Usage1.ts]
import MyConstEnum1 from './ImportExportDefault';
import MyConstEnum2 from './ReExportDefault';
MyConstEnum1.Foo;
MyConstEnum2.Foo;
//// [Usage2.ts]
import { MyConstEnum } from './ImportExport';
MyConstEnum.Foo;
//// [Usage3.ts]
import { MyConstEnum } from './ReExport';
MyConstEnum.Foo;


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
//// [ImportExportDefault.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [ReExportDefault.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [ReExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [Usage1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ImportExportDefault_1.default.Foo;
ReExportDefault_1.default.Foo;
//// [Usage2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ImportExport_1.MyConstEnum.Foo;
//// [Usage3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ReExport_1.MyConstEnum.Foo;
