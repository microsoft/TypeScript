// @useCaseSensitiveFilenames: true
// @declaration: true
// @filename: /cache/typescript-fsa/src/impl.d.ts
export function getA(): A;
export enum A {
    Val
}
// @filename: /cache/typescript-fsa/index.d.ts
export * from "./src/impl";
// @filename: /cache/typescript-fsa/package.json
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
// @link: /cache/typescript-fsa -> /p1/node_modules/typescript-fsa
// @link: /cache/typescript-fsa -> /p2/node_modules/typescript-fsa
