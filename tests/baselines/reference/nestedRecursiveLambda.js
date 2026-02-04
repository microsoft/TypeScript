//// [tests/cases/compiler/nestedRecursiveLambda.ts] ////

//// [nestedRecursiveLambda.ts]
function f(a:any) {
void (r =>(r => r));
}
f((r =>(r => r)));
void(r =>(r => r));
[(r =>(r => r))]

//// [nestedRecursiveLambda.js]
"use strict";
function f(a) {
    void (r => (r => r));
}
f((r => (r => r)));
void (r => (r => r));
[(r => (r => r))];
