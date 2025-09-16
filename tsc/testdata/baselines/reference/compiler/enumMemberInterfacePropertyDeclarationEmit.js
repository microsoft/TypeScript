//// [tests/cases/compiler/enumMemberInterfacePropertyDeclarationEmit.ts] ////

//// [enum.ts]
export enum WWMF{
    AAR = 'AAR',
}

//// [base.ts]
import type { WWMF } from "./enum";

interface WWMFMap {
    [WWMF.AAR]?: any;
}

export const wwmfMap: WWMFMap = {};


//// [enum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WWMF = void 0;
var WWMF;
(function (WWMF) {
    WWMF["AAR"] = "AAR";
})(WWMF || (exports.WWMF = WWMF = {}));
//// [base.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wwmfMap = void 0;
exports.wwmfMap = {};


//// [enum.d.ts]
export declare enum WWMF {
    AAR = "AAR"
}
//// [base.d.ts]
import type { WWMF } from "./enum";
interface WWMFMap {
    [WWMF.AAR]?: any;
}
export declare const wwmfMap: WWMFMap;
export {};
