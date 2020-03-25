//// [genericObjectCreationWithoutTypeArgs.ts]
class SS<T>{

}

var x1 = new SS<number>(); // OK
var x2 = new SS < number>;   // Correctly give error 
var x3 = new SS();         // OK
var x4 = new SS;           // Should be allowed, but currently give error ('supplied parameters do not match any signature of the call target')


//// [genericObjectCreationWithoutTypeArgs.js]
var SS = /** @class */ (function () {
    function SS() {
    }
    return SS;
}());
var x1 = new SS(); // OK
var x2 = new SS; // Correctly give error 
var x3 = new SS(); // OK
var x4 = new SS; // Should be allowed, but currently give error ('supplied parameters do not match any signature of the call target')
