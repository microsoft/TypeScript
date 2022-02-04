declare function fn(): { a: 1, b: 2 }
let a: number;
let b: number;

({ a, b } = fn());
{ a, b } = fn();

({ a, b } =
fn());

{ a, b }
= fn();