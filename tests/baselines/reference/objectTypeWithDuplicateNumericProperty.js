//// [objectTypeWithDuplicateNumericProperty.ts]
// numeric properties must be distinct after a ToNumber operation
// so the below are all errors

class C {
    1;
    1.0;
    1.;
    1.00;
}

interface I {
    1;
    1.0;
    1.;
    1.00;
}

var a: {
    1;
    1.0;
    1.;
    1.00;
}

var b = {
    1: 1,
    1.0: 1,
    1.: 1,
    1.00: 1
}



//// [objectTypeWithDuplicateNumericProperty.js]
// numeric properties must be distinct after a ToNumber operation
// so the below are all errors
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b = {
    1: 1,
    1.0: 1,
    1.: 1,
    1.00: 1
};
