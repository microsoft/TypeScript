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
(function (A) {
    var A = 12;
    var _A = '';
})(A || (A = {}));
var B;
(function (B) {
    var A = 12;
})(B || (B = {}));
var B;
(function (B) {
    var B = (function () {
        function B() {
        }
        return B;
    })();
})(B || (B = {}));
var X;
(function (X) {
    var X = 13;
    (function (Y) {
        var Y = 13;
        (function (Z) {
            var X = 12;
            var Y = 12;
            var Z = 12;
        })(Y.Z || (Y.Z = {}));
        var Z = Y.Z;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
var Y;
(function (Y) {
    (function (Y) {
        (function (Y) {
            Y[Y["Red"] = 0] = "Red";
            Y[Y["Blue"] = 1] = "Blue";
        })(Y.Y || (Y.Y = {}));
        var Y = Y.Y;
    })(Y.Y || (Y.Y = {}));
    var Y = Y.Y;
})(Y || (Y = {}));
var D;
(function (D) {
    D.E = 'hello';
})(D || (D = {}));
