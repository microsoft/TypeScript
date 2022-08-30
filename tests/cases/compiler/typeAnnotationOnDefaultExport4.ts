// @filename: /a.ts
interface I {
    a: number;
    b: number;
}

export default: I = { a: 1, b: 1 };

// @Filename: /b.ts
import a from "./a";
a;
