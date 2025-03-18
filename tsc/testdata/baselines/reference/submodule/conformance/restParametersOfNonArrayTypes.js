//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/restParametersOfNonArrayTypes.ts] ////

//// [restParametersOfNonArrayTypes.ts]
// Rest parameters must be an array type if they have a type annotation, so all these are errors

function foo(...x: string) { }
var f = function foo(...x: number) { }
var f2 = (...x: Date, ...y: boolean) => { }

class C {
    foo(...x: C) { }
}

interface I {
    (...x: string);
    foo(...x: number, ...y: number);
}

var a: {
    (...x: string);
    foo(...x: string);
}

var b = {
    foo(...x: string) { },
    a: function foo(...x: number, ...y: Date) { },
    b: (...x: string) => { }
}

//// [restParametersOfNonArrayTypes.js]
function foo(...x) { }
var f = function foo(...x) { };
var f2 = (...x, ...y) => { };
class C {
    foo(...x) { }
}
var a;
var b = {
    foo(...x) { },
    a: function foo(...x, ...y) { },
    b: (...x) => { }
};
