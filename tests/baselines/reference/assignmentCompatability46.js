//// [tests/cases/compiler/assignmentCompatability46.ts] ////

//// [assignmentCompatability46.ts]
declare function fn(x: never): void;

fn([1, 2, 3])
fn({ a: 1, b: 2 })


//// [assignmentCompatability46.js]
fn([1, 2, 3]);
fn({ a: 1, b: 2 });
