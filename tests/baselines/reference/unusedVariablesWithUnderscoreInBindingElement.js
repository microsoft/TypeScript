//// [unusedVariablesWithUnderscoreInBindingElement.ts]
function t1() {
    const [_a1, b1] = [1, 2];
    console.log(b1);

    const [a2, _b2] = [1, 2];
    console.log(a2);

    const [_a3, _b3] = [1, 2];
}

function t2() {
    const [_a1, b1] = [1, 2];
    const [a2, _b2] = [1, 2];
    const [a3, b3] = [1, 2];
}

function t3() {
    const [_a1, [[_b1, c1]], d1, _e1] = [1, [[2, 3]], 4, 5];
    console.log(c1, d1);

    const [_a2, [[_b2, _c2]], _d2, _e2] = [1, [[2, 3]], 4, 5];

    const [a3, [[b3, c3]], d3, e3] = [1, [[2, 3]], 4, 5];
}

function t4() {
    const { a1: _a1, b1 } = { a1: 1, b1: 1 };
    console.log(b1);

    const { a2, b2: _b2 } = { a2: 1, b2: 1 };
    console.log(a2);

    const { a3: _a3, b3: _b3 } = { a3: 1, b3: 1 };
}

function t5() {
    const { a1: _a1, b1 } = { a1: 1, b1: 1 };
    const { a2, b2: _b2 } = { a2: 1, b2: 1 };
    const { a3, b3 } = { a3: 1, b3: 1 };
}

function t6() {
    const {
        a1: _a1,
        b1: {
            b11: {
                b111: _b111,
                b112
            }
        },
        c1,
        d1: _d1
    } = { a1: 1, b1: { b11: { b111: 1, b112: 1 } }, c1: 1, d1: 1 };
    console.log(b112, c1);

    const {
        a2: _a2,
        b2: {
            b21: {
                b211: _b211, b212: _b212
            }
        },
        c2: _c2,
        d2: _d2
    } = { a2: 1, b2: { b21: { b211: 1, b212: 1 } }, c2: 1, d2: 1 };

    const {
        a3,
        b3: {
            b31: {
                b311, b312
            }
        },
        c3,
        d3
    } = { a3: 1, b3: { b31: { b311: 1, b312: 1 } }, c3: 1, d3: 1 };
}

function t7() {
    // error
    const { _a1, _b1 } = { _a1: 1, _b1: 1 };

    // ok
    const { a2: _a2, b2: _b2 } = { a2: 1, b2: 1 };

    // ok
    const { _a3: _ignoreA3, _b3: _ignoreB3 } = { _a3: 1, _b3: 1 };
}


//// [unusedVariablesWithUnderscoreInBindingElement.js]
function t1() {
    var _a = [1, 2], _a1 = _a[0], b1 = _a[1];
    console.log(b1);
    var _b = [1, 2], a2 = _b[0], _b2 = _b[1];
    console.log(a2);
    var _c = [1, 2], _a3 = _c[0], _b3 = _c[1];
}
function t2() {
    var _a = [1, 2], _a1 = _a[0], b1 = _a[1];
    var _b = [1, 2], a2 = _b[0], _b2 = _b[1];
    var _c = [1, 2], a3 = _c[0], b3 = _c[1];
}
function t3() {
    var _a = [1, [[2, 3]], 4, 5], _a1 = _a[0], _b = _a[1][0], _b1 = _b[0], c1 = _b[1], d1 = _a[2], _e1 = _a[3];
    console.log(c1, d1);
    var _c = [1, [[2, 3]], 4, 5], _a2 = _c[0], _d = _c[1][0], _b2 = _d[0], _c2 = _d[1], _d2 = _c[2], _e2 = _c[3];
    var _e = [1, [[2, 3]], 4, 5], a3 = _e[0], _f = _e[1][0], b3 = _f[0], c3 = _f[1], d3 = _e[2], e3 = _e[3];
}
function t4() {
    var _a = { a1: 1, b1: 1 }, _a1 = _a.a1, b1 = _a.b1;
    console.log(b1);
    var _b = { a2: 1, b2: 1 }, a2 = _b.a2, _b2 = _b.b2;
    console.log(a2);
    var _c = { a3: 1, b3: 1 }, _a3 = _c.a3, _b3 = _c.b3;
}
function t5() {
    var _a = { a1: 1, b1: 1 }, _a1 = _a.a1, b1 = _a.b1;
    var _b = { a2: 1, b2: 1 }, a2 = _b.a2, _b2 = _b.b2;
    var _c = { a3: 1, b3: 1 }, a3 = _c.a3, b3 = _c.b3;
}
function t6() {
    var _a = { a1: 1, b1: { b11: { b111: 1, b112: 1 } }, c1: 1, d1: 1 }, _a1 = _a.a1, _b = _a.b1.b11, _b111 = _b.b111, b112 = _b.b112, c1 = _a.c1, _d1 = _a.d1;
    console.log(b112, c1);
    var _c = { a2: 1, b2: { b21: { b211: 1, b212: 1 } }, c2: 1, d2: 1 }, _a2 = _c.a2, _d = _c.b2.b21, _b211 = _d.b211, _b212 = _d.b212, _c2 = _c.c2, _d2 = _c.d2;
    var _e = { a3: 1, b3: { b31: { b311: 1, b312: 1 } }, c3: 1, d3: 1 }, a3 = _e.a3, _f = _e.b3.b31, b311 = _f.b311, b312 = _f.b312, c3 = _e.c3, d3 = _e.d3;
}
function t7() {
    // error
    var _a = { _a1: 1, _b1: 1 }, _a1 = _a._a1, _b1 = _a._b1;
    // ok
    var _b = { a2: 1, b2: 1 }, _a2 = _b.a2, _b2 = _b.b2;
    // ok
    var _c = { _a3: 1, _b3: 1 }, _ignoreA3 = _c._a3, _ignoreB3 = _c._b3;
}
