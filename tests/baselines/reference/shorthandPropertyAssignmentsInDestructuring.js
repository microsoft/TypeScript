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
    var _a;
    var s0;
    for (var _i = 0, _b = [{ s0: 1 }]; _i < _b.length; _i++) {
        _a = _b[_i].s0, s0 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s1;
    for (var _i = 0, _b = [{}]; _i < _b.length; _i++) {
        _a = _b[_i].s1, s1 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s1;
    for (var _i = 0, _b = [{}]; _i < _b.length; _i++) {
        _a = _b[_i].s1, s1 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s2;
    for (var _i = 0, _b = [{ s2: "" }]; _i < _b.length; _i++) {
        _a = _b[_i].s2, s2 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s2;
    for (var _i = 0, _b = [{ s2: "" }]; _i < _b.length; _i++) {
        _a = _b[_i].s2, s2 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s3;
    for (var _i = 0, _b = [{ s3: "" }]; _i < _b.length; _i++) {
        _a = _b[_i].s3, s3 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var s3;
    for (var _i = 0, _b = [{ s3: "" }]; _i < _b.length; _i++) {
        _a = _b[_i].s3, s3 = _a === void 0 ? 5 : _a;
    }
});
(function () {
    var _a;
    var y;
    (_a = { y: 1 }.y, y = _a === void 0 ? 5 : _a);
});
(function () {
    var _a;
    var y;
    (_a = { y: 1 }.y, y = _a === void 0 ? 5 : _a);
});
(function () {
    var _a;
    var y0;
    (_a = { y0: 1 }.y0, y0 = _a === void 0 ? 5 : _a);
});
(function () {
    var _a;
    var y0;
    (_a = { y0: 1 }.y0, y0 = _a === void 0 ? 5 : _a);
});
(function () {
    var _a;
    var y1;
    (_a = {}.y1, y1 = _a === void 0 ? 5 : _a);
});
(function () {
    var _a;
    var y1;
    (_a = {}.y1, y1 = _a === void 0 ? 5 : _a);
});
(function () {
    var _a, _b, _c;
    var y2, y3;
    (_a = {}, _b = _a.y2, y2 = _b === void 0 ? 5 : _b, _c = _a.y3, y3 = _c === void 0 ? { x: 1 } : _c);
});
(function () {
    var _a, _b, _c;
    var y2, y3;
    (_a = {}, _b = _a.y2, y2 = _b === void 0 ? 5 : _b, _c = _a.y3, y3 = _c === void 0 ? { x: 1 } : _c);
});
(function () {
    var _a, _b, _c;
    var y4, y5;
    (_a = {}, _b = _a.y4, y4 = _b === void 0 ? 5 : _b, _c = _a.y5, y5 = _c === void 0 ? { x: 1 } : _c);
});
(function () {
    var _a, _b, _c;
    var y4, y5;
    (_a = {}, _b = _a.y4, y4 = _b === void 0 ? 5 : _b, _c = _a.y5, y5 = _c === void 0 ? { x: 1 } : _c);
});
(function () {
    var _a;
    var z;
    (_a = { z: { x: 1 } }.z, z = _a === void 0 ? { x: 5 } : _a);
});
(function () {
    var _a;
    var z;
    (_a = { z: { x: 1 } }.z, z = _a === void 0 ? { x: 5 } : _a);
});
(function () {
    var a = { s: s };
});
function foo(_a) {
    var _b = _a.a, a = _b === void 0 ? 4 : _b, _c = _a.b, b = _c === void 0 ? { x: 5 } : _c;
}
