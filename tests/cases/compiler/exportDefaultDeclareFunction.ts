// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default declare function A(): number;

// @Filename: b.ts
import A from "./a";

const x: number = A();