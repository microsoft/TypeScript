// @preserveConstEnums: true
// @filename: ConstEnum.ts
export const enum MyConstEnum {
    Foo,
    Bar
};
// @filename: ImportExport.ts
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
// @filename: ReExport.ts
export { MyConstEnum as default } from './ConstEnum';