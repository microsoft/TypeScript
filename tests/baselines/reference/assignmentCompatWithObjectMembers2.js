//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithObjectMembers2.ts] ////

//// [assignmentCompatWithObjectMembers2.ts]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
// additional optional properties do not cause errors

class S { foo: string; }
class T { foo: string; }
var s: S;
var t: T;

interface S2 { foo: string; bar?: string }
interface T2 { foo: string; baz?: string }
var s2: S2;
var t2: T2;

var a: { foo: string; bar?: string }
var b: { foo: string; baz?: string }

var a2 = { foo: '' };
var b2 = { foo: '' };

s = t;
t = s;
s = s2;
s = a2;

s2 = t2;
t2 = s2;
s2 = t;
s2 = b;
s2 = a2;

a = b;
b = a;
a = s;
a = s2;
a = a2;

a2 = b2;
b2 = a2;
a2 = b;
a2 = t2;
a2 = t;


//// [assignmentCompatWithObjectMembers2.js]
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
// additional optional properties do not cause errors
var S = /** @class */ (function () {
    function S() {
    }
    return S;
}());
var T = /** @class */ (function () {
    function T() {
    }
    return T;
}());
var s;
var t;
var s2;
var t2;
var a;
var b;
var a2 = { foo: '' };
var b2 = { foo: '' };
s = t;
t = s;
s = s2;
s = a2;
s2 = t2;
t2 = s2;
s2 = t;
s2 = b;
s2 = a2;
a = b;
b = a;
a = s;
a = s2;
a = a2;
a2 = b2;
b2 = a2;
a2 = b;
a2 = t2;
a2 = t;
