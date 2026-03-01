//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.ts] ////

//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.ts]
var x = {
    x, // OK
    undefinedVariable // Error
}


//// [objectLiteralShorthandPropertiesErrorFromNoneExistingIdentifier.js]
"use strict";
var x = {
    x, // OK
    undefinedVariable // Error
};
