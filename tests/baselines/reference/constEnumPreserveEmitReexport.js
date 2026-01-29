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
export var MyConstEnum;
(function (MyConstEnum) {
    MyConstEnum[MyConstEnum["Foo"] = 0] = "Foo";
    MyConstEnum[MyConstEnum["Bar"] = 1] = "Bar";
})(MyConstEnum || (MyConstEnum = {}));
;
//// [ImportExport.js]
import { MyConstEnum } from './ConstEnum';
export default MyConstEnum;
//// [ReExport.js]
export { MyConstEnum as default } from './ConstEnum';
