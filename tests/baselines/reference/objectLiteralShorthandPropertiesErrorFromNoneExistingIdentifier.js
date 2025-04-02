//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.ts] ////

//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.ts]
var x = {
    x, // OK
    undefinedVariable // Error
}


//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.js]
var x = {
    x: x, // OK
    undefinedVariable: undefinedVariable // Error
};
