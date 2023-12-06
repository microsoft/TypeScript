//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/callSignatureWithoutAnnotationsOrBody.ts] ////

//// [callSignatureWithoutAnnotationsOrBody.ts]
// Call signatures without a return type annotation and function body return 'any'

function foo(x) { }
var r = foo(1); // void since there's a body

interface I {
    ();
    f();
}
var i: I;
var r2 = i();
var r3 = i.f();

var a: {
    ();
    f();
};
var r4 = a();
var r5 = a.f();

//// [callSignatureWithoutAnnotationsOrBody.js]
// Call signatures without a return type annotation and function body return 'any'
function foo(x) { }
var r = foo(1); // void since there's a body
var i;
var r2 = i();
var r3 = i.f();
var a;
var r4 = a();
var r5 = a.f();
