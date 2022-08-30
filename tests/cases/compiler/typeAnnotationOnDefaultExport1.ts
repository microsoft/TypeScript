// @filename: /a.ts
export default: number = 1;

// @filename: /b.ts
export default: number = "";

// @filename: /c.ts
export default: number = {};

// @filename: /d.ts
interface I {
    a: number;
    b: string;
}
export default: I = {};

// @filename: /e.ts
export default: number[] = [];

// @filename: /f.ts
export default: number[] = [""];

// @filename: /g.ts
const a = [""];
export default: number[] = a;

// @filename: /h.ts
export default: number[];
