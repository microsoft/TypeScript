//// [tests/cases/transpile/declarationLinkedAliases.ts] ////

//// [declarationLinkedAliases.ts] ////
import { A } from "mod";
import B = A.C;
export { B };
//// [declarationLinkedAliases.d.ts] ////
import { A } from "mod";
import B = A.C;
export { B };
