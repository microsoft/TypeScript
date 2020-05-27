// @useCaseSensitiveFilenames: true
// @declaration: true
// @filename: /p1/node_modules/typescript-fsa/src/impl.d.ts
export function getA(): A;
export enum A {
    Val
}
// @filename: /p1/node_modules/typescript-fsa/index.d.ts
export * from "./src/impl";
// @filename: /p1/node_modules/typescript-fsa/package.json
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
// @filename: /p2/node_modules/typescript-fsa/src/impl.d.ts
export function getA(): A;
export enum A {
    Val
}
// @filename: /p2/node_modules/typescript-fsa/index.d.ts
export * from "./src/impl";
// @filename: /p2/node_modules/typescript-fsa/package.json
{
    "name": "typescript-fsa",
    "version": "1.0.0"
}
// @filename: /p1/index.ts
import * as _whatever from "p2";
import { getA } from "typescript-fsa";

export const a = getA();
// @filename: /p2/index.d.ts
export const a: import("typescript-fsa").A;

// @link: /p2 -> /p1/node_modules/p2
