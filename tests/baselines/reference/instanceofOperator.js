//// [instanceofOperator.ts]
// Spec:
// The instanceof operator requires the left operand to be of type Any or an object type, and the right 
// operand to be of type Any or a subtype of the ‘Function’ interface type. The result is always of the 
// Boolean primitive type.

module test {
    class Object { }
    var obj: Object;



    4 instanceof null;

    // Error and should be error
    obj instanceof 4;
    Object instanceof obj;

    // Error on left hand side
    null instanceof null;
    obj instanceof Object;
    undefined instanceof undefined;
}



//// [instanceofOperator.js]
// Spec:
// The instanceof operator requires the left operand to be of type Any or an object type, and the right 
// operand to be of type Any or a subtype of the ‘Function’ interface type. The result is always of the 
// Boolean primitive type.
var test;
(function (test) {
    var Object = /** @class */ (function () {
        function Object() {
        }
        return Object;
    }());
    var obj;
    4 instanceof null;
    // Error and should be error
    obj instanceof 4;
    Object instanceof obj;
    // Error on left hand side
    null instanceof null;
    obj instanceof Object;
    undefined instanceof undefined;
})(test || (test = {}));
