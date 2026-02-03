//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment3.ts] ////

//// [destructuringObjectBindingPatternAndAssignment3.ts]
// Error
var {h?} = { h?: 1 };
var {i}: string | number = { i: 2 };
var {i1}: string | number| {} = { i1: 2 };
var { f2: {f21} = { f212: "string" } }: any = undefined;
var {1} = { 1 };
var {"prop"} = { "prop": 1 };


//// [destructuringObjectBindingPatternAndAssignment3.js]
// Error
var h = { h: 1 }.h;
var i = { i: 2 }.i;
var i1 = { i1: 2 }.i1;
var _a = undefined.f2, _b = _a === void 0 ? { f212: "string" } : _a, f21 = _b.f21;
var  = { 1:  }[1];
var  = { "prop": 1 }["prop"];
