//// [tests/cases/compiler/moduleDeclarationExportStarShadowingGlobalIsNameable.ts] ////

//// [index.ts]
export * from "./account";

//// [account.ts]
export interface Account {
    myAccNum: number;
}
interface Account2 {
    myAccNum: number;
}
export { Account2 as Acc };

//// [index.ts]
declare global {
    interface Account {
        someProp: number;
    }
    interface Acc {
        someProp: number;
    }
}
import * as model from "./model";
export const func = (account: model.Account, acc2: model.Acc) => {};


//// [account.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.func = function (account, acc2) { };


//// [account.d.ts]
export interface Account {
    myAccNum: number;
}
interface Account2 {
    myAccNum: number;
}
export { Account2 as Acc };
//// [index.d.ts]
export * from "./account";
//// [index.d.ts]
declare global {
    interface Account {
        someProp: number;
    }
    interface Acc {
        someProp: number;
    }
}
import * as model from "./model";
export declare const func: (account: model.Account, acc2: model.Acc) => void;
