//// [tests/cases/conformance/externalModules/exportTypeMergedWithExportStarAsNamespace.ts] ////

//// [usage.ts]
import { Something } from "./prelude"
export const myValue: Something<string> = Something.of("abc")
export type MyType = Something.SubType<string>

//// [Something.ts]
export type Something<A> = { value: A }
export type SubType<A> = { value: A }
export declare function of<A>(value: A): Something<A>

//// [prelude.ts]
import * as S from "./Something"
export * as Something from "./Something"
export type Something<A> = S.Something<A>


//// [Something.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [prelude.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Something = void 0;
exports.Something = require("./Something");
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myValue = void 0;
var prelude_1 = require("./prelude");
exports.myValue = prelude_1.Something.of("abc");
