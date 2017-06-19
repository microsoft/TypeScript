//// [ModuleWithExportedAndNonExportedClasses.ts]
module A {
    export class A {
        id: number;
        name: string;
    }

    export class AG<T, U>{
        id: T;
        name: U;
    }

    class A2 {
        id: number;
        name: string;
    }

    class AG2<T, U>{
        id: T;
        name: U;
    }
}

// no errors expected, these are all exported
var a: { id: number; name: string };
var a = new A.A();

var AG = new A.AG<number, string>()

// errors expected, these are not exported
var a2 = new A.A2();
var ag2 = new A.A2<string, number>();



//// [ModuleWithExportedAndNonExportedClasses.js]
var A;
(function (A_1) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    A_1.A = A;
    var AG = /** @class */ (function () {
        function AG() {
        }
        return AG;
    }());
    A_1.AG = AG;
    var A2 = /** @class */ (function () {
        function A2() {
        }
        return A2;
    }());
    var AG2 = /** @class */ (function () {
        function AG2() {
        }
        return AG2;
    }());
})(A || (A = {}));
// no errors expected, these are all exported
var a;
var a = new A.A();
var AG = new A.AG();
// errors expected, these are not exported
var a2 = new A.A2();
var ag2 = new A.A2();
