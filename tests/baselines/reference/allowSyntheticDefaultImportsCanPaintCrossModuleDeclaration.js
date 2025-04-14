//// [tests/cases/compiler/allowSyntheticDefaultImportsCanPaintCrossModuleDeclaration.ts] ////

//// [color.ts]
interface Color {
    c: string;
}
export default Color;
//// [file1.ts]
import Color from "./color";
export declare function styled(): Color;
//// [file2.ts]
import { styled }  from "./file1";
export const A = styled();

//// [color.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var file1_1 = require("./file1");
exports.A = (0, file1_1.styled)();


//// [color.d.ts]
interface Color {
    c: string;
}
export default Color;
//// [file1.d.ts]
import Color from "./color";
export declare function styled(): Color;
//// [file2.d.ts]
export declare const A: import("./color").default;
