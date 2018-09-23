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
var A = A || (A = {});
(function (A_1) {
    // these 2 statements force an underscore before the 'A' 
    // in the generated function call.
    var A = 12;
    var _A = '';
})(A);
var B = B || (B = {});
(function (B) {
    var A = 12;
})(B);
(function (B_1) {
    // re-opened module with colliding name
    // this should add an underscore.
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
})(B);
var X = X || (X = {});
(function (X_1) {
    var X = 13;
    var Y = X_1.Y || (X_1.Y = {});
    (function (Y_1) {
        var Y = 13;
        var Z = Y_1.Z || (Y_1.Z = {});
        (function (Z_1) {
            var X = 12;
            var Y = 12;
            var Z = 12;
        })(Z);
    })(Y);
})(X);
var Y = Y || (Y = {});
(function (Y_2) {
    var Y = Y_2.Y || (Y_2.Y = {});
    (function (Y_3) {
        var Y = Y_3.Y || (Y_3.Y = {});
        (function (Y) {
            Y[Y["Red"] = 0] = "Red";
            Y[Y["Blue"] = 1] = "Blue";
        })(Y);
    })(Y);
})(Y);
// no collision, since interface doesn't
// generate code.
var D = D || (D = {});
(function (D) {
    D.E = 'hello';
})(D);
