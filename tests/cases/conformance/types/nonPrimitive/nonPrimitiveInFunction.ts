// @declaration: true
function takeObject(o: object) {}
function returnObject(): object {
    return {};
}

var nonPrimitive: object;
var primitive: boolean;

takeObject(nonPrimitive);
nonPrimitive = returnObject();

takeObject(primitive); // expect error
primitive = returnObject(); // expect error

function returnError(): object {
    var ret = 123;
    return ret; // expect error
}
