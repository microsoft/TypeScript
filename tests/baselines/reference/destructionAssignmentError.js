//// [destructionAssignmentError.ts]
declare function fn(): { a: 1, b: 2 }
let a: number;
let b: number;

({ a, b } = fn());
{ a, b } = fn();

({ a, b } =
fn());

{ a, b }
= fn();

//// [destructionAssignmentError.js]
var _a, _b;
var a;
var b;
(_a = fn(), a = _a.a, b = _a.b);
{
    a, b;
}
fn();
(_b = fn(), a = _b.a, b = _b.b);
{
    a, b;
}
fn();
