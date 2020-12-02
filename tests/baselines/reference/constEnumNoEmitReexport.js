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
exports.__esModule = true;
;
//// [ImportExport.js]
"use strict";
exports.__esModule = true;
//// [ImportExportDefault.js]
"use strict";
exports.__esModule = true;
//// [ReExportDefault.js]
"use strict";
exports.__esModule = true;
//// [ReExport.js]
"use strict";
exports.__esModule = true;
//// [Usage1.js]
"use strict";
exports.__esModule = true;
0 /* Foo */;
0 /* Foo */;
//// [Usage2.js]
"use strict";
exports.__esModule = true;
0 /* Foo */;
//// [Usage3.js]
"use strict";
exports.__esModule = true;
0 /* Foo */;
