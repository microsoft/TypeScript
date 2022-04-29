// @declaration: true
// @filename: color.ts
interface Color {
    c: string;
}
export default Color;
// @filename: file1.ts
import Color from "./color";
export declare function styled(): Color;
// @filename: file2.ts
import { styled }  from "./file1";
export const A = styled();