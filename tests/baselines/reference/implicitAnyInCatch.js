//// [implicitAnyInCatch.ts]
// this should not be an error
try { } catch (error) {
    if (error.number === -2147024809) { }
}
for (var key in this) { }

class C {
    public temp() {
        for (var x in this) {
        }
    }
}



//// [implicitAnyInCatch.js]
// this should not be an error
try { }
catch (error) {
    if (error.number === -2147024809) { }
}
for (var key in this) { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.temp = function () {
        for (var x in this) {
        }
    };
    return C;
}());
