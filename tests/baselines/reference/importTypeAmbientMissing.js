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
var x = { x: 0, y: 0 }; // typo, error


//// [importTypeAmbientMissing.d.ts]
declare module "foo" {
    interface Point {
        x: number;
        y: number;
    }
    export = Point;
}
declare const x: import("fo");
