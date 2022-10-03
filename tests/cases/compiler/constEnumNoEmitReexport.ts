// @filename: ConstEnum.ts
export const enum MyConstEnum {
    Foo,
    Bar
};
// @filename: ImportExport.ts
import { MyConstEnum } from './ConstEnum';
export { MyConstEnum };
// @filename: ImportExportDefault.ts
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
// @filename: ReExportDefault.ts
export { MyConstEnum as default } from './ConstEnum';
// @filename: ReExport.ts
export { MyConstEnum } from './ConstEnum';
// @filename: Usage1.ts
import MyConstEnum1 from './ImportExportDefault';
import MyConstEnum2 from './ReExportDefault';
MyConstEnum1.Foo;
MyConstEnum2.Foo;
// @filename: Usage2.ts
import { MyConstEnum } from './ImportExport';
MyConstEnum.Foo;
// @filename: Usage3.ts
import { MyConstEnum } from './ReExport';
MyConstEnum.Foo;
