//// [restParameterNoTypeAnnotation.ts]
function foo(...rest) {   
     var x: number = rest[0];
     return x;   
}  


//// [restParameterNoTypeAnnotation.js]
function foo() {
    var x = rest[0];
    return x;
}
