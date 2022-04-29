//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.ts]
var x = {
    x, // OK
    undefinedVariable // Error
}


//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.js]
var x = {
    x: x,
    undefinedVariable: undefinedVariable // Error
};
