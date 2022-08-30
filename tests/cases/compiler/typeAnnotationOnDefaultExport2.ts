// @filename: /a.ts
interface I {
    a: boolean;
    b: boolean;
}

export default: I = { c: false };

// @Filename: /b.ts
import a from "./a";
a;
