//// [propertyNameWithoutTypeAnnotation.ts]
class C {
    foo;
}

interface I {
    foo;
}

var a: {
    foo;
}

var b = {
    foo: null
}

// These should all be of type 'any'
var r1 = (new C()).foo;
var r2 = (<I>null).foo;
var r3 = a.foo;
var r4 = b.foo;

//// [propertyNameWithoutTypeAnnotation.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b = {
    foo: null
};
// These should all be of type 'any'
var r1 = (new C()).foo;
var r2 = null.foo;
var r3 = a.foo;
var r4 = b.foo;
