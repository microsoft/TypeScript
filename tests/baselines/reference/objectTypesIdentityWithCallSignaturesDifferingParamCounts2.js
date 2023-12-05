//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithCallSignaturesDifferingParamCounts2.ts] ////

//// [objectTypesIdentityWithCallSignaturesDifferingParamCounts2.ts]
// object types are identical structurally

interface I {
    (x: string): string;
}

interface I2<T> {
    (x: T): T;
}

var a: { (x: string, y: string): string }

function foo2(x: I);
function foo2(x: I); // error
function foo2(x: any) { }

function foo3(x: typeof a);
function foo3(x: typeof a); // error
function foo3(x: any) { }

function foo4(x: I2<string>);
function foo4(x: I2<string>); // error
function foo4(x: any) { }

function foo5(x: I2<string>);
function foo5(x: I2<number>); // ok
function foo5(x: any) { }

function foo13(x: I);
function foo13(x: typeof a); // ok
function foo13(x: any) { }

function foo14(x: I);
function foo14(x: I2<string>); // error
function foo14(x: any) { }

function foo14b(x: typeof a);
function foo14b(x: I2<string>); // ok
function foo14b(x: any) { }

function foo15(x: I);
function foo15(x: I2<number>); // ok
function foo15(x: any) { }

//// [objectTypesIdentityWithCallSignaturesDifferingParamCounts2.js]
// object types are identical structurally
var a;
function foo2(x) { }
function foo3(x) { }
function foo4(x) { }
function foo5(x) { }
function foo13(x) { }
function foo14(x) { }
function foo14b(x) { }
function foo15(x) { }
