//// [tests/cases/compiler/nestedLoopWithOnlyInnerLetCaptured.ts] ////

//// [nestedLoopWithOnlyInnerLetCaptured.ts]
declare let doSomething;

for (let a1 of [])
    for (let a2 of a1.someArray)
        doSomething(() => a2);

//// [nestedLoopWithOnlyInnerLetCaptured.js]
"use strict";
for (let a1 of [])
    for (let a2 of a1.someArray)
        doSomething(() => a2);
