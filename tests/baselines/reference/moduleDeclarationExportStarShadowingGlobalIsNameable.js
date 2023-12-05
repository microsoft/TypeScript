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
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./account"), exports);
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = void 0;
var func = function (account, acc2) { };
exports.func = func;


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
