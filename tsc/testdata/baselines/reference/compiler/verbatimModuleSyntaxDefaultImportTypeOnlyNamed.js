//// [tests/cases/compiler/verbatimModuleSyntaxDefaultImportTypeOnlyNamed.ts] ////

//// [a.ts]
export default class A {}
export type T = number;
export const v = 0;

//// [b.ts]
import A1, { type T } from "./a";
import A2, { type T as T2, v } from "./a";
import { type T as T3 } from "./a";
import A4, {} from "./a";
import A5, { /* comment */ type T as T5 } from "./a";
import A6, {
    type T as T6,
} from "./a";

export { A1, A2, A4, A5, A6, v };


//// [a.js]
export default class A {
}
export const v = 0;
//// [b.js]
import A1 from "./a";
import A2, { v } from "./a";
import {} from "./a";
import A4, {} from "./a";
import A5 from "./a";
import A6 from "./a";
export { A1, A2, A4, A5, A6, v };
