//// [destructuringObjectBindingPatternAndAssignment1.ts]
var c = 0;
var { a, } = { a:1, };
var { b: { c }  } = { b: { c } };
var { b1: { c1 } = { c1: "string" }  } = { b1: { c1: "world" } };
var { d1 }: any = undefined;
var { e1 }: any = {};
var { f: {f1} = { f1: "string" } }: any = {};
var { f2: {f21} = { f21: "string" } }: any = undefined;
var { e1: {e2} = { e2: "string" } }: any|{ e1: { e2 } } = undefined;
var { e2: {e3} = { e3: "string" } }: any|{ e2: { e3 } } = {};
var {g = 1}: any = { g: 100000 };
var {1: x} = { 1: "string" };

//// [destructuringObjectBindingPatternAndAssignment1.js]
var c = 0;
var a = ({ a: 1 }).a;
var c = ({ b: { c: c } }).b.c;
var _a = ({ b1: { c1: "world" } }).b1, c1 = (_a === void 0 ? { c1: "string" } : _a).c1;
var d1 = undefined.d1;
var e1 = ({}).e1;
var _b = ({}).f, f1 = (_b === void 0 ? { f1: "string" } : _b).f1;
var _c = undefined.f2, f21 = (_c === void 0 ? { f21: "string" } : _c).f21;
var _d = undefined.e1, e2 = (_d === void 0 ? { e2: "string" } : _d).e2;
var _e = ({}).e2, e3 = (_e === void 0 ? { e3: "string" } : _e).e3;
var _f = ({ g: 100000 }).g, g = _f === void 0 ? 1 : _f;
var x = ({ 1: "string" })[1];
