//// [tests/cases/compiler/importHelpersWithExportStarAs.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
export * as a from "./a";

//// [tslib.d.ts]
declare module "tslib" {
    function __importStar(m: any): void;
}

//// [a.js]
export class A {
}
//// [b.js]
export * as a from "./a";
