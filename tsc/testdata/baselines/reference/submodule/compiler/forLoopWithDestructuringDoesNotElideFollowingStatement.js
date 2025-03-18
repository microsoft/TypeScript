//// [tests/cases/compiler/forLoopWithDestructuringDoesNotElideFollowingStatement.ts] ////

//// [forLoopWithDestructuringDoesNotElideFollowingStatement.ts]
let array = [{a: 0, b: 1}]
for (let { a, ...rest } of array)
    void a

//// [forLoopWithDestructuringDoesNotElideFollowingStatement.js]
let array = [{ a: 0, b: 1 }];
for (let { a, ...rest } of array)
    void a;
