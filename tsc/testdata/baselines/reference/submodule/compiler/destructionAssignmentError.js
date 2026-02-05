//// [tests/cases/compiler/destructionAssignmentError.ts] ////

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
"use strict";
let a;
let b;
({ a, b } = fn());
{
    a, b;
}
fn();
({ a, b } =
    fn());
{
    a, b;
}
fn();
