// void returning call signatures can be assigned a non-void returning call signature that otherwise matches

interface T {
    new (x: number): void;
}
var t: T;
var a: { new (x: number): void };

t = a;
a = t;

interface S {
    new (x: number): string;
}
var s: S;
var a2: { new (x: number): string };
t = s;
t = a2;
a = s;
a = a2;

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
