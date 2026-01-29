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
export {};
//// [file1.js]
export {};
//// [file2.js]
import { styled } from "./file1";
export const A = styled();


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
