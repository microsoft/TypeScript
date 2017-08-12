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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.temp = function () {
        for (var x in this) {
        }
    };
    return C;
}());
