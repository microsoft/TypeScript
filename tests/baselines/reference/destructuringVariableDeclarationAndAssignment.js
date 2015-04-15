//// [destructuringVariableDeclarationAndAssignment.ts]
var {o: [a1, a2, a3 = { b1: 1000, b4: 200 }]} = { o: [1, 2, { b1: 4, b4: 0 }] }; 
var {o0: [c, d, { e: e1, f }, , ]} = { o0: [1, 2, { e: 4, f: 0 }] };
var {o1: [a11, a21, { b12: b22, b42 },, ...c]} = { o1: [1, 2, { b12: 4, b42: 0 }] }; 

//// [destructuringVariableDeclarationAndAssignment.js]
var _a = ({ o: [1, 2, { b1: 4, b4: 0 }] }).o, a1 = _a[0], a2 = _a[1], _b = _a[2], a3 = _b === void 0 ? { b1: 1000, b4: 200 } : _b;
var _c = ({ o0: [1, 2, { e: 4, f: 0 }] }).o0, c = _c[0], d = _c[1], _d = _c[2], e1 = _d.e, f = _d.f;
var _e = ({ o1: [1, 2, { b12: 4, b42: 0 }] }).o1, a11 = _e[0], a21 = _e[1], _f = _e[2], b22 = _f.b12, b42 = _f.b42, c = _e.slice(4);
