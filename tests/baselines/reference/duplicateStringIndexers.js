//// [duplicateStringIndexers.ts]
// it is an error to have duplicate index signatures of the same kind in a type

module test {
    interface Number {
        [x: string]: string;
        [x: string]: string;
    }

    interface String {
        [x: string]: string;
        [x: string]: string;
    }

    interface Array<T> {
        [x: string]: T;
        [x: string]: T;
    }

    class C {
        [x: string]: string;
        [x: string]: string;
    }

    interface I {
        [x: string]: string;
        [x: string]: string;
    }

    var a: {
        [x: string]: string;
        [x: string]: string;
    }
}


//// [duplicateStringIndexers.js]
// it is an error to have duplicate index signatures of the same kind in a type
var test;
(function (test) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var a;
})(test || (test = {}));
