//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/stringLiteralTypesInImplementationSignatures.ts] ////

//// [stringLiteralTypesInImplementationSignatures.ts]
// String literal types are only valid in overload signatures

function foo(x: 'hi') { }
var f = function foo(x: 'hi') { }
var f2 = (x: 'hi', y: 'hi') => { }

class C {
    foo(x: 'hi') { }
}

interface I {
    (x: 'hi');
    foo(x: 'hi', y: 'hi');
}

var a: {
    (x: 'hi');
    foo(x: 'hi');
}

var b = {
    foo(x: 'hi') { },
    a: function foo(x: 'hi', y: 'hi') { },
    b: (x: 'hi') => { }
}


//// [stringLiteralTypesInImplementationSignatures.js]
// String literal types are only valid in overload signatures
function foo(x) { }
var f = function foo(x) { };
var f2 = (x, y) => { };
class C {
    foo(x) { }
}
var a;
var b = {
    foo(x) { },
    a: function foo(x, y) { },
    b: (x) => { }
};
