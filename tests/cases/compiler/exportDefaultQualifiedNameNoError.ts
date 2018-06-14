// @filename: code.ts
class C { static x = 0; };
export default C.x;
// @filename: usage.ts
import def from "./code";
void def;