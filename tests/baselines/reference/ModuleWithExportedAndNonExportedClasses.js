//// [ModuleWithExportedAndNonExportedClasses.js]
var A;
(function (_A) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    _A.A = A;

    var AG = (function () {
        function AG() {
        }
        return AG;
    })();
    _A.AG = AG;

    var A2 = (function () {
        function A2() {
        }
        return A2;
    })();

    var AG2 = (function () {
        function AG2() {
        }
        return AG2;
    })();
})(A || (A = {}));

// no errors expected, these are all exported
var a;
var a = new A.A();

var AG = new A.AG();

// errors expected, these are not exported
var a2 = new A.A2();
var ag2 = new A.A2();
