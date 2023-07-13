//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithCallSignatures.ts] ////

//// [assignmentCompatWithCallSignatures.ts]
// void returning call signatures can be assigned a non-void returning call signature that otherwise matches

interface T {
    (x: number): void;
}
var t: T;
var a: { (x: number): void };

t = a;
a = t;

interface S {
    (x: number): string;
}
var s: S;
var a2: { (x: number): string };
t = s;
t = a2;
a = s;
a = a2;

t = <T>(x: T) => 1;
t = () => 1;
t = function (x: number) { return ''; }
a = <T>(x: T) => 1;
a = () => 1;
a = function (x: number) { return ''; }

interface S2 {
    (x: string): void;
}
var s2: S2;
var a3: { (x: string): void };
// these are errors
t = s2;
t = a3;
t = (x: string) => 1;
t = function (x: string) { return ''; }
a = s2;
a = a3;
a = (x: string) => 1;
a = function (x: string) { return ''; }


//// [assignmentCompatWithCallSignatures.js]
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
t = function (x) { return 1; };
t = function () { return 1; };
t = function (x) { return ''; };
a = function (x) { return 1; };
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
