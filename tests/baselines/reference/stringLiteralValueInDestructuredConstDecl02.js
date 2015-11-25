//// [stringLiteralValueInDestructuredConstDecl02.ts]

const {x: {y}} = {
    x: {
        y: "foo"
    } 
};

var foo2: "foo" = y;


//// [stringLiteralValueInDestructuredConstDecl02.js]
var y = {
    x: {
        y: "foo"
    }
}.x.y;
var foo2 = y;
