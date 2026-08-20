//// [tests/cases/compiler/usingDeclarationsHoistedExportOrder.ts] ////

//// [usingDeclarationsHoistedExportOrder.ts]
using x = null;
export class C01 {}
export class C02 {}
export class C03 {}
export class C04 {}
export class C05 {}
export class C06 {}
export class C07 {}
export class C08 {}
export class C09 {}
export class C10 {}
export class C11 {}
export class C12 {}


//// [usingDeclarationsHoistedExportOrder.js]
export { C01, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, C12 };
var x, C01, C02, C03, C04, C05, C06, C07, C08, C09, C10, C11, C12;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    x = __addDisposableResource(env_1, null, false);
    C01 = class C01 {
    };
    C02 = class C02 {
    };
    C03 = class C03 {
    };
    C04 = class C04 {
    };
    C05 = class C05 {
    };
    C06 = class C06 {
    };
    C07 = class C07 {
    };
    C08 = class C08 {
    };
    C09 = class C09 {
    };
    C10 = class C10 {
    };
    C11 = class C11 {
    };
    C12 = class C12 {
    };
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
