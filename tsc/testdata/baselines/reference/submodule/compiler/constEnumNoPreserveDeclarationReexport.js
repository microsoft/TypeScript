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
ConstEnum_1.MyConstEnum.Foo;
ImportExport_1.default.Foo;
ReExport_1.default.Foo;
