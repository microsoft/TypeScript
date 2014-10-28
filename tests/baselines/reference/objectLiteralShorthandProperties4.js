//// [objectLiteralShorthandProperties4.ts]
var x = {
    x, // OK
    undefinedVariable // Error
}


//// [objectLiteralShorthandProperties4.js]
var x = {
    x: x,
    undefinedVariable: undefinedVariable // Error
};
