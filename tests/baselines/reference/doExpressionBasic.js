//// [doExpressionBasic.ts]
const a1 = do { };
const a1a = async do { };
const a2 = do { 1 };
const a2a = async do { 1 };
const a3 = () => do { throw 1 };
const a3a = () => async do { throw 1 };

const b1 = do {
    try {
        1
    } catch (e) {
        2
    } finally {
        3
    }
}
const b1a = async do {
    try {
        1
    } catch (e) {
        2
    } finally {
        3
    }
}


//// [doExpressionBasic.js]
var _a, _b, _c, _d, _e, _f;
const a1 = ((() => { })(), _a);
const a1a = (async () => { })().then(() => _b);
const a2 = ((() => { _c = 1; })(), _c);
const a2a = (async () => { _d = 1; })().then(() => _d);
const a3 = () => { var _g; return (() => { throw 1; })(), _g; };
const a3a = () => { var _g; return (async () => { throw 1; })().then(() => _g); };
const b1 = ((() => {
    try {
        _e = 1;
    }
    catch (e) {
        _e = 2;
    }
    finally {
        3;
    }
})(), _e);
const b1a = (async () => {
    try {
        _f = 1;
    }
    catch (e) {
        _f = 2;
    }
    finally {
        3;
    }
})().then(() => _f);
