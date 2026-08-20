//// [tests/cases/compiler/importHelpersWithImportStarAs.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import * as a from "./a";
export { a };

//// [tslib.d.ts]
declare module "tslib" {
    function __importStar(m: any): void;
}

//// [a.js]
export class A {
}
//// [b.js]
import * as a from "./a";
export { a };
