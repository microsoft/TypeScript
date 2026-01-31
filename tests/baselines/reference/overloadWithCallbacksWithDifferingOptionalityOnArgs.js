//// [tests/cases/compiler/overloadWithCallbacksWithDifferingOptionalityOnArgs.ts] ////

//// [overloadWithCallbacksWithDifferingOptionalityOnArgs.ts]
function x2(callback: (x?: number) => number);
function x2(callback: (x: string) => number);
function x2(callback: (x: any) => number) { }
x2(() => 1);
x2((x) => 1 );


//// [overloadWithCallbacksWithDifferingOptionalityOnArgs.js]
function x2(callback) { }
x2(() => 1);
x2((x) => 1);
