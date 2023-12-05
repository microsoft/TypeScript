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
Object.defineProperty(exports, "__esModule", { value: true });
0 /* MyConstEnum.Foo */;
0 /* AlsoEnum.Foo */;
0 /* StillEnum.Foo */;
