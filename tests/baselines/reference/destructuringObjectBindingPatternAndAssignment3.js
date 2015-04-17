//// [destructuringObjectBindingPatternAndAssignment3.ts]
var {h?} = { h?: 1 };
var {i}: string | number = { i: 2 };
var {i1}: string | number| {} = { i1: 2 };
var { f2: {f21} = { f212: "string" } }: any = undefined;
var { b1: { c1 } = { c1: "string" }  } = { b1: { c1: c } };
var { d }: any;
var { ...d1 } = {
    a: 1, b: 1, d1: 9, e: 10
}
var {1} = { 1 };

//// [destructuringObjectBindingPatternAndAssignment3.js]
var h = ({ h: 1 }).h;
var i = ({ i: 2 }).i;
var i1 = ({ i1: 2 }).i1;
var _a = undefined.f2, f21 = (_a === void 0 ? { f212: "string" } : _a).f21;
var _b = ({ b1: { c1: c } }).b1, c1 = (_b === void 0 ? { c1: "string" } : _b).c1;
var d = (void 0).d;
var d1 = ({
    a: 1, b: 1, d1: 9, e: 10
}).d1;
var  = ({ 1:  })[1];
