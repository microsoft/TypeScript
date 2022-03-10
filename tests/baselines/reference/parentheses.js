//// [parentheses.ts]
declare const o1: ((...args: any[]) => number);
declare const o2: { b: (...args: any[]) => number };
declare const o3: { b: ((...args: any[]) => (...args: any[]) => number) };
declare const o4: { b: ((...args: any[]) => { c: (...args: any[]) => number } ) };

(o1)(o1 ?? 1);
(o2?.b)(o1 ?? 1);
(o3?.b())(o1 ?? 1);
(o4?.b().c)(o1 ?? 1);


//// [parentheses.js]
var _a;
(o1)(o1 !== null && o1 !== void 0 ? o1 : 1);
(o2 === null || o2 === void 0 ? void 0 : o2.b).call(o2, o1 !== null && o1 !== void 0 ? o1 : 1);
(o3 === null || o3 === void 0 ? void 0 : o3.b())(o1 !== null && o1 !== void 0 ? o1 : 1);
(o4 === null || o4 === void 0 ? void 0 : (_a = o4.b()).c).call(_a, o1 !== null && o1 !== void 0 ? o1 : 1);
