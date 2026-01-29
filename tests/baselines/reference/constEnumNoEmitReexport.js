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
;
export {};
//// [ImportExport.js]
export {};
//// [ImportExportDefault.js]
export {};
//// [ReExportDefault.js]
export {};
//// [ReExport.js]
export {};
//// [Usage1.js]
0 /* MyConstEnum1.Foo */;
0 /* MyConstEnum2.Foo */;
export {};
//// [Usage2.js]
0 /* MyConstEnum.Foo */;
export {};
//// [Usage3.js]
0 /* MyConstEnum.Foo */;
export {};
