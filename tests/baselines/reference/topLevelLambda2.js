//// [tests/cases/compiler/topLevelLambda2.ts] ////

//// [topLevelLambda2.ts]
function foo(x:any) {}

foo(()=>this.window);

//// [topLevelLambda2.js]
function foo(x) { }
foo(() => this.window);
