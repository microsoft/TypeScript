// @target: ES5
// @module: commonjs
// @declaration: true

module m {
    class private1 {
    }

    export class public1 {
    }

    // Directly using names from this module
    var x: private1;
    var y = new private1();

    export var k: private1;
    export var l = new private1();

    var x2: public1;
    var y2 = new public1();

    export var k2: public1;
    export var l2 = new public1();

    module m2 {
        export class public2 {
        }
    }

    var x3: m2.public2;
    var y3 = new m2.public2();

    export var k3: m2.public2;
    export var l3 = new m2.public2();
}
