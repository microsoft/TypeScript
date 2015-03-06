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
(function (_A_1) {
    // these 2 statements force an underscore before the 'A' 
    // in the generated function call.
    var A = 12;
    var _A = '';
})(A || (A = {}));
var B;
(function (B) {
    var A = 12;
})(B || (B = {}));
var B;
(function (_B) {
    // re-opened module with colliding name
    // this should add an underscore.
    var B = (function () {
        function B() {
        }
        return B;
    })();
})(B || (B = {}));
var X;
(function (_X) {
    var X = 13;
    var Y;
    (function (_Y) {
        var Y = 13;
        var Z;
        (function (_Z) {
            var X = 12;
            var Y = 12;
            var Z = 12;
        })(Z = _Y.Z || (_Y.Z = {}));
    })(Y = _X.Y || (_X.Y = {}));
})(X || (X = {}));
var Y;
(function (_Y_1) {
    var Y;
    (function (_Y_2) {
        (function (Y) {
            Y[Y["Red"] = 0] = "Red";
            Y[Y["Blue"] = 1] = "Blue";
        })(_Y_2.Y || (_Y_2.Y = {}));
        var Y = _Y_2.Y;
    })(Y = _Y_1.Y || (_Y_1.Y = {}));
})(Y || (Y = {}));
// no collision, since interface doesn't
// generate code.
var D;
(function (D) {
    D.E = 'hello';
})(D || (D = {}));
