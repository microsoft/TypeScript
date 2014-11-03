// @declaration: true
interface Window {
    someMethod();
}
module M {
    export type Value = string | number | boolean;
    export var x: Value;
}
module M {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W;
    }
}