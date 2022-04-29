//// [destructuringSameNames.ts]
// Valid cases

let { foo, foo: bar } = { foo: 1 };
({ foo, foo } = { foo: 2 });
({ foo, foo: bar } = { foo: 3 });
({ foo: bar, foo } = { foo: 4 });
({ foo, bar: foo } = { foo: 3, bar: 33 });
({ bar: foo, foo } = { foo: 4, bar: 44 });
({ foo: bar, foo: bar } = { foo: 5 });
({ foo: bar, bar: foo } = { foo: 6, bar: 66 });
({ foo: bar, foo: bar } = { foo: 7 });

[foo, foo] = [111, 1111];
[foo, foo] = [222, 2222];
[bar, foo, foo] = [333, 3333, 33333];
[foo, bar, foo] = [333, 3333, 33333];
[foo, foo, bar] = [444, 4444, 44444];

// Error cases

let { foo1, foo1 } = { foo1: 10 };
let { foo2, bar2: foo2 } = { foo2: 20, bar2: 220 };
let { bar3: foo3, foo3 } = { foo3: 30, bar3: 330 };
const { foo4, foo4 } = { foo4: 40 };
const { foo5, bar5: foo5 } = { foo5: 50, bar5: 550 };
const { bar6: foo6, foo6 } = { foo6: 60, bar6: 660 };

let [blah1, blah1] = [111, 222];
const [blah2, blah2] = [333, 444];


//// [destructuringSameNames.js]
// Valid cases
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
var _p = { foo: 1 }, foo = _p.foo, bar = _p.foo;
(_a = { foo: 2 }, foo = _a.foo, foo = _a.foo);
(_b = { foo: 3 }, foo = _b.foo, bar = _b.foo);
(_c = { foo: 4 }, bar = _c.foo, foo = _c.foo);
(_d = { foo: 3, bar: 33 }, foo = _d.foo, foo = _d.bar);
(_e = { foo: 4, bar: 44 }, foo = _e.bar, foo = _e.foo);
(_f = { foo: 5 }, bar = _f.foo, bar = _f.foo);
(_g = { foo: 6, bar: 66 }, bar = _g.foo, foo = _g.bar);
(_h = { foo: 7 }, bar = _h.foo, bar = _h.foo);
_j = [111, 1111], foo = _j[0], foo = _j[1];
_k = [222, 2222], foo = _k[0], foo = _k[1];
_l = [333, 3333, 33333], bar = _l[0], foo = _l[1], foo = _l[2];
_m = [333, 3333, 33333], foo = _m[0], bar = _m[1], foo = _m[2];
_o = [444, 4444, 44444], foo = _o[0], foo = _o[1], bar = _o[2];
// Error cases
var _q = { foo1: 10 }, foo1 = _q.foo1, foo1 = _q.foo1;
var _r = { foo2: 20, bar2: 220 }, foo2 = _r.foo2, foo2 = _r.bar2;
var _s = { foo3: 30, bar3: 330 }, foo3 = _s.bar3, foo3 = _s.foo3;
var _t = { foo4: 40 }, foo4 = _t.foo4, foo4 = _t.foo4;
var _u = { foo5: 50, bar5: 550 }, foo5 = _u.foo5, foo5 = _u.bar5;
var _v = { foo6: 60, bar6: 660 }, foo6 = _v.bar6, foo6 = _v.foo6;
var _w = [111, 222], blah1 = _w[0], blah1 = _w[1];
var _x = [333, 444], blah2 = _x[0], blah2 = _x[1];
