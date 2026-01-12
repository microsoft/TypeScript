//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithConstructSignatures2.ts] ////

//// [assignmentCompatWithConstructSignatures2.ts]
// void returning call signatures can be assigned a non-void returning call signature that otherwise matches

interface T {
    f: new (x: number) => void;
}
declare var t: T;
declare var a: { f: new (x: number) => void };

t = a;
a = t;

interface S {
    f: new (x: number) => string;
}
declare var s: S;
declare var a2: { f: new (x: number) => string };
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
declare var s2: S2;
declare var a3: { f(x: string): void };
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
t = a;
a = t;
t = s;
t = a2;
a = s;
a = a2;
// errors
t = function () { return 1; };
t = function (x) { return ''; };
a = function () { return 1; };
a = function (x) { return ''; };
// these are errors
t = s2;
t = a3;
t = function (x) { return 1; };
t = function (x) { return ''; };
a = s2;
a = a3;
a = function (x) { return 1; };
a = function (x) { return ''; };
