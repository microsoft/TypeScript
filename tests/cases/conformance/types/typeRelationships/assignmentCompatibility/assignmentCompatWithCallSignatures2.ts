// void returning call signatures can be assigned a non-void returning call signature that otherwise matches

interface T {
    f(x: number): void;
}
var t: T;
var a: { f(x: number): void };

t = a;
a = t;

interface S {
    f(x: number): string;
}
var s: S;
var a2: { f(x: number): string };
t = s;
t = a2;
a = s;
a = a2;

t = { f: () => 1 };
t = { f: <T>(x:T) => 1 };
t = { f: function f() { return 1 } };
t = { f(x: number) { return ''; } }
a = { f: () => 1 }
a = { f: <T>(x: T) => 1 };
a = { f: function (x: number) { return ''; } }

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
