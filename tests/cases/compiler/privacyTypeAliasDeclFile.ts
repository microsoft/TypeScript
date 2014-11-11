// @module: commonjs
// @declaration: true
interface Window {
    someMethod();
}
module M {
    type W = Window | string;
    export module N {
        export class Window { }
        export var p: W; // Should report error that W is private
    }
}
module M1 {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W;
    }
}