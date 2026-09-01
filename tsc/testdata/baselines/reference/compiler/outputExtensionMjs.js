//// [tests/cases/compiler/outputExtensionMjs.ts] ////

//// [a.ts]
export declare const a: string;

//// [b.tsx]
export declare const b: number;

//// [main.ts]
export { a } from "./a.ts";
export { b } from "./b.tsx";
export type A = typeof import("./a.ts").a;




//// [a.d.mts]
export declare const a: string;
//// [b.d.mts]
export declare const b: number;
//// [main.d.mts]
export { a } from "./a.mjs";
export { b } from "./b.mjs";
export type A = typeof import("./a.mjs").a;
