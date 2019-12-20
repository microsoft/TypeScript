//// [tests/cases/compiler/constEnumNoPreserveDeclarationReexport.ts] ////

//// [ConstEnum.d.ts]
export const enum MyConstEnum {
    Foo,
    Bar
}
//// [ImportExport.d.ts]
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
//// [ReExport.d.ts]
export { MyConstEnum as default } from './ConstEnum';
//// [usages.ts]
import {MyConstEnum} from "./ConstEnum";
import AlsoEnum from "./ImportExport";
import StillEnum from "./ReExport";

MyConstEnum.Foo;
AlsoEnum.Foo;
StillEnum.Foo;


//// [usages.js]
"use strict";
exports.__esModule = true;
0 /* Foo */;
0 /* Foo */;
0 /* Foo */;
