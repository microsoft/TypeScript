//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/stringLiteralTypesInImplementationSignatures2.ts] ////

//// [stringLiteralTypesInImplementationSignatures2.ts]
// String literal types are only valid in overload signatures

function foo(x: any);
function foo(x: 'hi') { }

class C {
    foo(x: string);
    foo(x: 'hi') { }
}

interface I {
    (x: 'a');
    (x: 'hi');
    foo(x: 'a', y: 'a');
    foo(x: 'hi', y: 'hi');
}

var a: {
    (x: 'hi');
    (x: 'a');
    foo(x: 'hi');
    foo(x: 'a');
}

var b = {
    foo(x: 'hi') { },
    foo(x: 'a') { },
}


//// [stringLiteralTypesInImplementationSignatures2.js]
// String literal types are only valid in overload signatures
function foo(x) { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    return C;
}());
var a;
var b = {
    foo: function (x) { },
    foo: function (x) { },
};
