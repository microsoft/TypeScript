//// [tests/cases/compiler/computedPropertyNameWithImportedKey.ts] ////

//// [a.ts]
export const a = Symbol();

//// [b.ts]
import { a } from "./a";
export function fn({ [a]: value }: any): string {
    return value;
}


//// [a.js]
export const a = Symbol();
//// [b.js]
import { a } from "./a";
export function fn({ [a]: value }) {
    return value;
}


//// [a.d.ts]
export declare const a: unique symbol;
//// [b.d.ts]
import { a } from "./a";
export declare function fn({ [a]: value }: any): string;
