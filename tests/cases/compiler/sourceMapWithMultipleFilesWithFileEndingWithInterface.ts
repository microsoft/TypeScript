// @outFile: fooResult.js
// @sourcemap: true
// @Filename: a.ts
module M {
    export var X = 1;
}
interface Navigator {
    getGamepads(func?: any): any;
    webkitGetGamepads(func?: any): any
    msGetGamepads(func?: any): any;
    webkitGamepads(func?: any): any;
}

// @Filename: b.ts
module m1 {
    export class c1 {
    }
}
