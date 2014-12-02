//// [restParameterNoTypeAnnotation.ts]
function foo(...rest) {   
     var x: number = rest[0];
     return x;   
}  


//// [restParameterNoTypeAnnotation.js]
function foo() {
    var rest = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        rest[_a - 0] = arguments[_a];
    }
    var x = rest[0];
    return x;
}
