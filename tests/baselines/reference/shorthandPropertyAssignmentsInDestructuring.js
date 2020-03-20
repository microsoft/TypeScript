//// [shorthandPropertyAssignmentsInDestructuring.ts]
(function() {
	var s0;
	for ({ s0 = 5 } of [{ s0: 1 }]) {
	}
});
(function() {
	var s0;
	for ({ s0:s0 = 5 } of [{ s0: 1 }]) {
	}
});

(function() {
	var s1;
	for ({ s1 = 5 } of [{}]) {
	}
});

(function() {
	var s1;
	for ({ s1:s1 = 5 } of [{}]) {
	}
});

(function() {
	var s2;
	for ({ s2 = 5 } of [{ s2: "" }]) {
	}
});

(function() {
	var s2;
	for ({ s2:s2 = 5 } of [{ s2: "" }]) {
	}
});

(function() {
	var s3: string;
	for ({ s3 = 5 } of [{ s3: "" }]) {
	}
});

(function() {
	var s3: string;
	for ({ s3:s3 = 5 } of [{ s3: "" }]) {
	}
});

(function() {
	let y;
	({ y = 5 } = { y: 1 })
});

(function() {
	let y;
	({ y:y = 5 } = { y: 1 })
});

(function() {
	let y0: number;
	({ y0 = 5 } = { y0: 1 })
});

(function() {
	let y0: number;
	({ y0:y0 = 5 } = { y0: 1 })
});

(function() {
	let y1: string;
	({ y1 = 5 } = {})
});

(function() {
	let y1: string;
	({ y1:y1 = 5 } = {})
});

(function() {
	let y2: string, y3: { x: string };
	({ y2 = 5, y3 = { x: 1 } } = {})
});

(function() {
	let y2: string, y3: { x: string };
	({ y2:y2 = 5, y3:y3 = { x: 1 } } = {})
});

(function() {
	let y4: number, y5: { x: number };
	({ y4 = 5, y5 = { x: 1 } } = {})
});

(function() {
	let y4: number, y5: { x: number };
	({ y4:y4 = 5, y5:y5 = { x: 1 } } = {})
});


(function() {
	let z;
	({ z = { x: 5 } } = { z: { x: 1 } });
});


(function() {
	let z;
	({ z:z = { x: 5 } } = { z: { x: 1 } });
});

(function() {
	let a = { s = 5 };
});

function foo({a = 4, b = { x: 5 }}) {
}

//// [shorthandPropertyAssignmentsInDestructuring.js]
(function () {
    var _a;
    var s0;
    for (var _i = 0, _b = [{ s0: 1 }]; _i < _b.length; _i++) {
        _a = _b[_i].s0, s0 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _c;
    var s0;
    for (var _i = 0, _d = [{ s0: 1 }]; _i < _d.length; _i++) {
        _c = _d[_i].s0, s0 = _c === void 0 ? 5 : _c;
    }
});
(function () {
    var _e;
    var s1;
    for (var _i = 0, _f = [{}]; _i < _f.length; _i++) {
        _e = _f[_i].s1, s1 = _e === void 0 ? 5 : _e;
    }
});
(function () {
    var _g;
    var s1;
    for (var _i = 0, _h = [{}]; _i < _h.length; _i++) {
        _g = _h[_i].s1, s1 = _g === void 0 ? 5 : _g;
    }
});
(function () {
    var _j;
    var s2;
    for (var _i = 0, _k = [{ s2: "" }]; _i < _k.length; _i++) {
        _j = _k[_i].s2, s2 = _j === void 0 ? 5 : _j;
    }
});
(function () {
    var _l;
    var s2;
    for (var _i = 0, _m = [{ s2: "" }]; _i < _m.length; _i++) {
        _l = _m[_i].s2, s2 = _l === void 0 ? 5 : _l;
    }
});
(function () {
    var _o;
    var s3;
    for (var _i = 0, _p = [{ s3: "" }]; _i < _p.length; _i++) {
        _o = _p[_i].s3, s3 = _o === void 0 ? 5 : _o;
    }
});
(function () {
    var _q;
    var s3;
    for (var _i = 0, _r = [{ s3: "" }]; _i < _r.length; _i++) {
        _q = _r[_i].s3, s3 = _q === void 0 ? 5 : _q;
    }
});
(function () {
    var _s;
    var y;
    (_s = { y: 1 }.y, y = _s === void 0 ? 5 : _s);
});
(function () {
    var _t;
    var y;
    (_t = { y: 1 }.y, y = _t === void 0 ? 5 : _t);
});
(function () {
    var _u;
    var y0;
    (_u = { y0: 1 }.y0, y0 = _u === void 0 ? 5 : _u);
});
(function () {
    var _v;
    var y0;
    (_v = { y0: 1 }.y0, y0 = _v === void 0 ? 5 : _v);
});
(function () {
    var _w;
    var y1;
    (_w = {}.y1, y1 = _w === void 0 ? 5 : _w);
});
(function () {
    var _x;
    var y1;
    (_x = {}.y1, y1 = _x === void 0 ? 5 : _x);
});
(function () {
    var _y, _z, _0;
    var y2, y3;
    (_y = {}, _z = _y.y2, y2 = _z === void 0 ? 5 : _z, _0 = _y.y3, y3 = _0 === void 0 ? { x: 1 } : _0);
});
(function () {
    var _1, _2, _3;
    var y2, y3;
    (_1 = {}, _2 = _1.y2, y2 = _2 === void 0 ? 5 : _2, _3 = _1.y3, y3 = _3 === void 0 ? { x: 1 } : _3);
});
(function () {
    var _4, _5, _6;
    var y4, y5;
    (_4 = {}, _5 = _4.y4, y4 = _5 === void 0 ? 5 : _5, _6 = _4.y5, y5 = _6 === void 0 ? { x: 1 } : _6);
});
(function () {
    var _7, _8, _9;
    var y4, y5;
    (_7 = {}, _8 = _7.y4, y4 = _8 === void 0 ? 5 : _8, _9 = _7.y5, y5 = _9 === void 0 ? { x: 1 } : _9);
});
(function () {
    var _10;
    var z;
    (_10 = { z: { x: 1 } }.z, z = _10 === void 0 ? { x: 5 } : _10);
});
(function () {
    var _11;
    var z;
    (_11 = { z: { x: 1 } }.z, z = _11 === void 0 ? { x: 5 } : _11);
});
(function () {
    var a = { s: s };
});
function foo(_12) {
    var _13 = _12.a, a = _13 === void 0 ? 4 : _13, _14 = _12.b, b = _14 === void 0 ? { x: 5 } : _14;
}
