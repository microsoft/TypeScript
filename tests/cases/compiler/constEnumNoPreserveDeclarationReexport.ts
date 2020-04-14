// @filename: ConstEnum.d.ts
export const enum MyConstEnum {
    Foo,
    Bar
}
// @filename: ImportExport.d.ts
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
// @filename: ReExport.d.ts
export { MyConstEnum as default } from './ConstEnum';
// @filename: usages.ts
import {MyConstEnum} from "./ConstEnum";
import AlsoEnum from "./ImportExport";
import StillEnum from "./ReExport";

MyConstEnum.Foo;
AlsoEnum.Foo;
StillEnum.Foo;
