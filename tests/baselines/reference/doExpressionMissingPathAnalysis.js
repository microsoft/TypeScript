//// [doExpressionMissingPathAnalysis.ts]
const a = do {
    if (1 > 2) true; // missing else
}

const b = do {
    if (1 > 2) true;
    else if (2 > 1) false; // missing else
}

const c = do {
    try { 1; } catch {} // catch clause missing val
}

const d = do {
    try { } catch { 1; } // try clause missing val
}

const e = do {
    try {1} catch {2} finally {} // this is fine
}

enum F {
    A, B
}

function f(x: F) {
    const a = do {
        switch (x) { } // empty switch
    }
    const b = do {
        switch (x) { case F.A: {} } // empty case
    }
    const c = do {
        // TODO: it should report, not all cases (F.B) handled / missing a default block
        switch (x) { case F.A: 1; }
    }
}

const g = do {
    console.log('') // void returning functions
}
// No problem
const h = do { 1;;;;; }
// No problem
const i = do { "val"; debugger; }
const j = do { throw new Error(""); }

//// [doExpressionMissingPathAnalysis.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
var a = ((function () {
    if (_a = void 0, 1 > 2)
        _a = true;
})(), _a);
var b = ((function () {
    if (_b = void 0, 1 > 2)
        _b = true;
    else if (2 > 1)
        _b = false; // missing else
})(), _b);
var c = ((function () {
    try {
        _c = void 0;
        _c = 1;
    }
    catch (_a) { } // catch clause missing val
})(), _c);
var d = ((function () {
    try {
        _d = void 0;
    }
    catch (_a) {
        _d = 1;
    } // try clause missing val
})(), _d);
var e = ((function () {
    try {
        _e = void 0;
        _e = 1;
    }
    catch (_a) {
        _e = 2;
    }
    finally { } // this is fine
})(), _e);
var F;
(function (F) {
    F[F["A"] = 0] = "A";
    F[F["B"] = 1] = "B";
})(F || (F = {}));
function f(x) {
    var _a, _b, _c;
    var a = ((function () {
        switch ((_a = void 0, x)) {
        } // empty switch
    })(), _a);
    var b = ((function () {
        switch ((_b = void 0, x)) {
            case F.A: { }
        } // empty case
    })(), _b);
    var c = ((function () {
        switch ((_c = void 0, x)) {
            case F.A: _c = 1;
        }
    })(), _c);
}
var g = ((function () {
    _f = console.log('') // void returning functions
    ;
})(), _f);
// No problem
var h = ((function () { _g = 1; ; ; ; ; })(), _g);
// No problem
var i = ((function () { _h = "val"; debugger; })(), _h);
var j = ((function () { throw new Error(""); })(), _j);
