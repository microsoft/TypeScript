/// <reference path="fourslash.ts" />

//// [|/// <reference path="./tripleSlashReference.ts" />
//// f1/*0*/();|]

// @Filename: Module.ts
//// export function f1() {}
//// export var v1 = 5;

// @Filename: tripleSlashReference.ts
//// var x = 5;/*dummy*/

verify.importFixAtPosition([
`/// <reference path="./tripleSlashReference.ts" />
import { f1 } from "./Module";

f1();`
]);
