//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName3.ts] ////

//// [a.ts]
export const n = 1;
export const s = "s";
export enum E1 { A = "ENUM_KEY" }
export enum E2 { B }

//// [b.ts]
import * as keys from "./a";

const t1 = {
    [keys.n]: 1,
    [keys.n]: 1, // duplicate
}

const t2 = {
    [keys.s]: 1,
    [keys.s]: 1, // duplicate
}

const t3 = {
    [keys.E1.A]: 1,
    [keys.E1.A]: 1, // duplicate
}

const t4 = {
    [keys.E2.B]: 1,
    [keys.E2.B]: 1, // duplicate
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2 = exports.E1 = exports.s = exports.n = void 0;
exports.n = 1;
exports.s = "s";
var E1;
(function (E1) {
    E1["A"] = "ENUM_KEY";
})(E1 || (exports.E1 = E1 = {}));
var E2;
(function (E2) {
    E2[E2["B"] = 0] = "B";
})(E2 || (exports.E2 = E2 = {}));
//// [b.js]
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const keys = __importStar(require("./a"));
const t1 = {
    [keys.n]: 1,
    [keys.n]: 1, // duplicate
};
const t2 = {
    [keys.s]: 1,
    [keys.s]: 1, // duplicate
};
const t3 = {
    [keys.E1.A]: 1,
    [keys.E1.A]: 1, // duplicate
};
const t4 = {
    [keys.E2.B]: 1,
    [keys.E2.B]: 1, // duplicate
};
