// @filename: /a.ts
interface I {
    a: boolean;
    b: boolean;
}
const a = { c: 1 };
export default: I = a;

// @Filename: /b.ts
import a from "./a";
a;
