//// [tests/cases/compiler/restParameterNoTypeAnnotation.ts] ////

//// [restParameterNoTypeAnnotation.ts]
function foo(...rest) {   
     var x: number = rest[0];
     return x;   
}  


//// [restParameterNoTypeAnnotation.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var x = rest[0];
    return x;
}
