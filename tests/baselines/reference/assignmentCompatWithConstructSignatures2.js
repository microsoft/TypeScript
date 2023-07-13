//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithConstructSignatures2.ts] ////

//// [assignmentCompatWithConstructSignatures2.ts]
// void returning call signatures can be assigned a non-void returning call signature that otherwise matches

interface T {
    f: new (x: number) => void;
}
var t: T;
var a: { f: new (x: number) => void };

t = a;
a = t;

interface S {
    f: new (x: number) => string;
}
var s: S;
var a2: { f: new (x: number) => string };
t = s;
t = a2;
a = s;
a = a2;

// errors
t = () => 1;
t = function (x: number) { return ''; }
a = () => 1;
a = function (x: number) { return ''; }

interface S2 {
    f(x: string): void;
}
var s2: S2;
var a3: { f(x: string): void };
// these are errors
t = s2;
t = a3;
t = (x: string) => 1;
t = function (x: string) { return ''; }
a = s2;
a = a3;
a = (x: string) => 1;
a = function (x: string) { return ''; }


//// [assignmentCompatWithConstructSignatures2.js]
// void returning call signatures can be assigned a non-void returning call signature that otherwise matches
var t;
var a;
t = a;
a = t;
var s;
var a2;
t = s;
t = a2;
a = s;
a = a2;
// errors
t = function () { return 1; };
t = function (x) { return ''; };
a = function () { return 1; };
a = function (x) { return ''; };
var s2;
var a3;
// these are errors
t = s2;
t = a3;
t = function (x) { return 1; };
t = function (x) { return ''; };
a = s2;
a = a3;
a = function (x) { return 1; };
a = function (x) { return ''; };
