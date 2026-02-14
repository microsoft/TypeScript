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
export { WWMF };
var WWMF;
(function (WWMF) {
    WWMF["AAR"] = "AAR";
})(WWMF || (WWMF = {}));
//// [base.js]
export const wwmfMap = {};


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
