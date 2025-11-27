// @declaration: true
// @lib: es6

// @filename: /a.ts
export const a = Symbol();

// @filename: /b.ts
import { a } from "./a";
export function fn({ [a]: value }: any): string {
    return value;
}
