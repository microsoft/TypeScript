//// [tests/cases/compiler/commonjsExportDestructuringImportedValue.ts] ////

//// [enum.ts]
export class CodePriceType {
    static A = "a";
    static B = "b";
}
export default CodePriceType;
export const pair = ["a", "b"];
export const fallback = "fallback";

//// [repro.ts]
import { CodePriceType } from "./enum";
export const { A, B } = CodePriceType;

//// [arrayPattern.ts]
import { pair } from "./enum";
export const [ArrayA, ArrayB] = pair;

//// [aliasedNamedObject.ts]
import { CodePriceType as PriceType } from "./enum";
export const { A: AliasA, B: AliasB } = PriceType;

//// [defaultObject.ts]
import CodePriceType from "./enum";
export const { A: DefaultA, B: DefaultB } = CodePriceType;

//// [defaultInitializer.ts]
import { CodePriceType, fallback } from "./enum";
export const { Missing = fallback } = CodePriceType as any;


//// [enum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = exports.pair = exports.CodePriceType = void 0;
class CodePriceType {
    static A = "a";
    static B = "b";
}
exports.CodePriceType = CodePriceType;
exports.default = CodePriceType;
exports.pair = ["a", "b"];
exports.fallback = "fallback";
//// [repro.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
const enum_1 = require("./enum");
({ A: exports.A, B: exports.B } = enum_1.CodePriceType);
//// [arrayPattern.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayB = exports.ArrayA = void 0;
const enum_1 = require("./enum");
[exports.ArrayA, exports.ArrayB] = enum_1.pair;
//// [aliasedNamedObject.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasB = exports.AliasA = void 0;
const enum_1 = require("./enum");
({ A: exports.AliasA, B: exports.AliasB } = enum_1.CodePriceType);
//// [defaultObject.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultB = exports.DefaultA = void 0;
const enum_1 = __importDefault(require("./enum"));
({ A: exports.DefaultA, B: exports.DefaultB } = enum_1.default);
//// [defaultInitializer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Missing = void 0;
const enum_1 = require("./enum");
({ Missing: exports.Missing = enum_1.fallback } = enum_1.CodePriceType);
