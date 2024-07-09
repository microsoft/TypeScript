//// [tests/cases/conformance/internalModules/codeGeneration/nameCollision.ts] ////

//// [nameCollision.ts]
module A {
    // these 2 statements force an underscore before the 'A' 
    // in the generated function call.
    var A = 12;
    var _A = '';
}

module B {
    var A = 12;
}

module B {
    // re-opened module with colliding name
    // this should add an underscore.
    class B {
        name: string;
    }
}

module X {
    var X = 13;
    export module Y {
        var Y = 13;
        export module Z {
            var X = 12;
            var Y = 12;
            var Z = 12;
        }
    }
}

module Y.Y {
    export enum Y {
        Red, Blue
    }
}

// no collision, since interface doesn't
// generate code.
module D {
    export interface D {
        id: number;
    }

    export var E = 'hello';
}

//// [nameCollision.js]
var A;
(function (A_1) {
    // these 2 statements force an underscore before the 'A' 
    // in the generated function call.
    var A = 12;
    var _A = '';
})(A || (A = {}));
var B;
(function (B) {
    var A = 12;
})(B || (B = {}));
(function (B_1) {
    // re-opened module with colliding name
    // this should add an underscore.
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
})(B || (B = {}));
var X;
(function (X_1) {
    var X = 13;
    var Y;
    (function (Y_1) {
        var Y = 13;
        var Z;
        (function (Z_1) {
            var X = 12;
            var Y = 12;
            var Z = 12;
        })(Z = Y_1.Z || (Y_1.Z = {}));
    })(Y = X_1.Y || (X_1.Y = {}));
})(X || (X = {}));
var Y;
(function (Y_2) {
    var Y;
    (function (Y_3) {
        var Y;
        (function (Y) {
            Y[Y["Red"] = 0] = "Red";
            Y[Y["Blue"] = 1] = "Blue";
        })(Y = Y_3.Y || (Y_3.Y = {}));
    })(Y = Y_2.Y || (Y_2.Y = {}));
})(Y || (Y = {}));
// no collision, since interface doesn't
// generate code.
var D;
(function (D) {
    D.E = 'hello';
})(D || (D = {}));
