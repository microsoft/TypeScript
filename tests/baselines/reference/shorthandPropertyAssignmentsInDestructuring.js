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
    for (var _d = 0, _e = [{ s0: 1 }]; _d < _e.length; _d++) {
        _c = _e[_d].s0, s0 = _c === void 0 ? 5 : _c;
    }
});
(function () {
    var _f;
    var s1;
    for (var _g = 0, _h = [{}]; _g < _h.length; _g++) {
        _f = _h[_g].s1, s1 = _f === void 0 ? 5 : _f;
    }
});
(function () {
    var _j;
    var s1;
    for (var _k = 0, _l = [{}]; _k < _l.length; _k++) {
        _j = _l[_k].s1, s1 = _j === void 0 ? 5 : _j;
    }
});
(function () {
    var _m;
    var s2;
    for (var _o = 0, _p = [{ s2: "" }]; _o < _p.length; _o++) {
        _m = _p[_o].s2, s2 = _m === void 0 ? 5 : _m;
    }
});
(function () {
    var _q;
    var s2;
    for (var _r = 0, _s = [{ s2: "" }]; _r < _s.length; _r++) {
        _q = _s[_r].s2, s2 = _q === void 0 ? 5 : _q;
    }
});
(function () {
    var _t;
    var s3;
    for (var _u = 0, _v = [{ s3: "" }]; _u < _v.length; _u++) {
        _t = _v[_u].s3, s3 = _t === void 0 ? 5 : _t;
    }
});
(function () {
    var _w;
    var s3;
    for (var _x = 0, _y = [{ s3: "" }]; _x < _y.length; _x++) {
        _w = _y[_x].s3, s3 = _w === void 0 ? 5 : _w;
    }
});
(function () {
    var _z;
    var y;
    (_z = { y: 1 }.y, y = _z === void 0 ? 5 : _z);
});
(function () {
    var _0;
    var y;
    (_0 = { y: 1 }.y, y = _0 === void 0 ? 5 : _0);
});
(function () {
    var _1;
    var y0;
    (_1 = { y0: 1 }.y0, y0 = _1 === void 0 ? 5 : _1);
});
(function () {
    var _2;
    var y0;
    (_2 = { y0: 1 }.y0, y0 = _2 === void 0 ? 5 : _2);
});
(function () {
    var _3;
    var y1;
    (_3 = {}.y1, y1 = _3 === void 0 ? 5 : _3);
});
(function () {
    var _4;
    var y1;
    (_4 = {}.y1, y1 = _4 === void 0 ? 5 : _4);
});
(function () {
    var _5, _6, _7;
    var y2, y3;
    (_5 = {}, _6 = _5.y2, y2 = _6 === void 0 ? 5 : _6, _7 = _5.y3, y3 = _7 === void 0 ? { x: 1 } : _7);
});
(function () {
    var _8, _9, _10;
    var y2, y3;
    (_8 = {}, _9 = _8.y2, y2 = _9 === void 0 ? 5 : _9, _10 = _8.y3, y3 = _10 === void 0 ? { x: 1 } : _10);
});
(function () {
    var _11, _12, _13;
    var y4, y5;
    (_11 = {}, _12 = _11.y4, y4 = _12 === void 0 ? 5 : _12, _13 = _11.y5, y5 = _13 === void 0 ? { x: 1 } : _13);
});
(function () {
    var _14, _15, _16;
    var y4, y5;
    (_14 = {}, _15 = _14.y4, y4 = _15 === void 0 ? 5 : _15, _16 = _14.y5, y5 = _16 === void 0 ? { x: 1 } : _16);
});
(function () {
    var _17;
    var z;
    (_17 = { z: { x: 1 } }.z, z = _17 === void 0 ? { x: 5 } : _17);
});
(function () {
    var _18;
    var z;
    (_18 = { z: { x: 1 } }.z, z = _18 === void 0 ? { x: 5 } : _18);
});
(function () {
    var a = { s: s };
});
function foo(_19) {
    var _20 = _19.a, a = _20 === void 0 ? 4 : _20, _21 = _19.b, b = _21 === void 0 ? { x: 5 } : _21;
}
