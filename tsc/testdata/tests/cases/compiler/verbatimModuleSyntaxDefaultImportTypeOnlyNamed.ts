// @target: esnext
// @module: esnext
// @moduleResolution: bundler
// @verbatimModuleSyntax: true

// @Filename: /a.ts
export default class A {}
export type T = number;
export const v = 0;

// @Filename: /b.ts
import A1, { type T } from "./a";
import A2, { type T as T2, v } from "./a";
import { type T as T3 } from "./a";
import A4, {} from "./a";
import A5, { /* comment */ type T as T5 } from "./a";
import A6, {
    type T as T6,
} from "./a";

export { A1, A2, A4, A5, A6, v };
