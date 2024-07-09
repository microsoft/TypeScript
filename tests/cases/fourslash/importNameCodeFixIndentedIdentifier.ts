/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|import * as b from "./b";
////{
////    x/**/
////}|]

// @Filename: /b.ts
////export const x = 0;

verify.importFixAtPosition([
`import * as b from "./b";
{
    b.x
}`,
`import * as b from "./b";
import { x } from "./b";
{
    x
}`,
]);
