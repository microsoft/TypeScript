// @target: ES5
// @module: commonjs
// @declaration: true

module m {
    class private1 {
    }
    module m2 {
        export class public1 {
        }
    }

    export var x: {
        x: private1;
        y: m2.public1;
        (): m2.public1[];
        method(): private1;
        [n: number]: private1;
        [s: string]: m2.public1;
    };
    export var x2 = {
        x: new private1(),
        y: new m2.public1(),
        method() {
            return new private1();
        }
    };
    export var x3 = x;

    // Function type
    export var y: (a: private1) => m2.public1;
    export var y2 = y;

    // constructor type
    export var z: new (a: private1) => m2.public1;
    export var z2 = z;
}