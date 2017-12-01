//// [tests/cases/compiler/reExportGlobalDeclaration4.ts] ////

//// [file1.d.ts]
declare class Cls1 {
    x: number
}
declare class Cls2 {
    x: number
}


//// [file2.ts]
export {Cls1, Cls1 as CCls1};
export {Cls2, Cls2 as CCls2};
export {Cls1 as CCCls1};
export {Cls2 as CCCls2};

//// [file2.js]
"use strict";
exports.__esModule = true;
