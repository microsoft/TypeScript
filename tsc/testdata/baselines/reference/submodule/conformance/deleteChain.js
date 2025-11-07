//// [tests/cases/conformance/expressions/optionalChaining/delete/deleteChain.ts] ////

//// [deleteChain.ts]
declare const o1: undefined | { b: string };
delete o1?.b;
delete (o1?.b);

declare const o2: undefined | { b: { c: string } };
delete o2?.b.c;
delete (o2?.b.c);

declare const o3: { b: undefined | { c: string } };
delete o3.b?.c;
delete (o3.b?.c);

declare const o4: { b?: { c: { d?: { e: string } } } };
delete o4.b?.c.d?.e;
delete (o4.b?.c.d)?.e;
delete (o4.b?.c.d?.e);

declare const o5: { b?(): { c: { d?: { e: string } } } };
delete o5.b?.().c.d?.e;
delete (o5.b?.().c.d?.e);

declare const o6: { b?: { c: { d?: { e: string } } } };
delete o6.b?.['c'].d?.['e'];
delete (o6.b?.['c'].d?.['e']);

//// [deleteChain.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
o1 === null || o1 === void 0 ? true : delete o1.b;
(o1 === null || o1 === void 0 ? true : delete o1.b);
o2 === null || o2 === void 0 ? true : delete o2.b.c;
(o2 === null || o2 === void 0 ? true : delete o2.b.c);
(_a = o3.b) === null || _a === void 0 ? true : delete _a.c;
((_b = o3.b) === null || _b === void 0 ? true : delete _b.c);
(_d = (_c = o4.b) === null || _c === void 0 ? void 0 : _c.c.d) === null || _d === void 0 ? true : delete _d.e;
(_f = ((_e = o4.b) === null || _e === void 0 ? void 0 : _e.c.d)) === null || _f === void 0 ? true : delete _f.e;
((_h = (_g = o4.b) === null || _g === void 0 ? void 0 : _g.c.d) === null || _h === void 0 ? true : delete _h.e);
(_k = (_j = o5.b) === null || _j === void 0 ? void 0 : _j.call(o5).c.d) === null || _k === void 0 ? true : delete _k.e;
((_m = (_l = o5.b) === null || _l === void 0 ? void 0 : _l.call(o5).c.d) === null || _m === void 0 ? true : delete _m.e);
(_p = (_o = o6.b) === null || _o === void 0 ? void 0 : _o['c'].d) === null || _p === void 0 ? true : delete _p['e'];
((_r = (_q = o6.b) === null || _q === void 0 ? void 0 : _q['c'].d) === null || _r === void 0 ? true : delete _r['e']);
