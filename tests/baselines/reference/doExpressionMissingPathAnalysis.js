//// [doExpressionMissingPathAnalysis.ts]
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
var _a, _b, _c, _d, _e, _f, _g;
var c = ((function () {
    try {
        _a = void 0;
        _a = 1;
    }
    catch (_a) { } // catch clause missing val
})(), _a);
var d = ((function () {
    try {
        _b = void 0;
    }
    catch (_a) {
        _b = 1;
    } // try clause missing val
})(), _b);
var e = ((function () {
    try {
        _c = void 0;
        _c = 1;
    }
    catch (_a) {
        _c = 2;
    }
    finally { } // this is fine
})(), _c);
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
    _d = console.log('') // void returning functions
    ;
})(), _d);
// No problem
var h = ((function () { _e = 1; ; ; ; ; })(), _e);
// No problem
var i = ((function () { _f = "val"; debugger; })(), _f);
var j = ((function () { throw new Error(""); })(), _g);
