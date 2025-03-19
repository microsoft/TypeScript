//// [tests/cases/conformance/types/import/importTypeAmbientMissing.ts] ////

//// [importTypeAmbientMissing.ts]
declare module "foo" {
    interface Point {
        x: number;
        y: number;
    }
    export = Point;
}
const x: import("fo") = { x: 0, y: 0 }; // typo, error



//// [importTypeAmbientMissing.js]
const x = { x: 0, y: 0 }; // typo, error
