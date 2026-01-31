//// [tests/cases/compiler/restParameterNoTypeAnnotation.ts] ////

//// [restParameterNoTypeAnnotation.ts]
function foo(...rest) {   
     var x: number = rest[0];
     return x;   
}  


//// [restParameterNoTypeAnnotation.js]
function foo(...rest) {
    var x = rest[0];
    return x;
}
