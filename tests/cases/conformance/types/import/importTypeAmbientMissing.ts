// @declaration: true
// @lib: es6
declare module "foo" {
    interface Point {
        x: number;
        y: number;
    }
    export = Point;
}
const x: import("fo") = { x: 0, y: 0 }; // typo, error

