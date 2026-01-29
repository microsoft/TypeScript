//// [tests/cases/compiler/missingMemberErrorHasShortPath.ts] ////

//// [utils.ts]
export function exist() {}
//// [sample.ts]
import { exit } from "./utils.js";

exit()

//// [utils.js]
export function exist() { }
//// [sample.js]
import { exit } from "./utils.js";
exit();
