//// [optionalFunctionArgAssignability.js]
var a = function then(onFulfill, onReject) {
    return null;
};
var b = function then(onFulFill, onReject) {
    return null;
};
a = b; // error because number is not assignable to string
