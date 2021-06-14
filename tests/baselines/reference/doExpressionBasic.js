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

const c1 = do {
    if (a2) 1; else 2
}
const c2 = do {
    // only track the last expr
    if (a2) 1; else 2

    try {
        if (a2) 1; else 2
        if (a2) 1; else 2
    } catch (e) {
        { e as "" }
    } finally {}
}


//// [doExpressionBasic.js]
var _a, _b, _c, _d, _e, _f, _g;
const a1 = ((() => { })(), _a);
const a1a = (async () => { })().then(() => _b);
const a2 = ((() => { _c = 1; })(), _c);
const a2a = (async () => { _d = 1; })().then(() => _d);
const a3 = () => { var _h; return (() => { throw 1; })(), _h; };
const a3a = () => { var _h; return (async () => { throw 1; })().then(() => _h); };
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
const c1 = ((() => {
    if (a2)
        _f = 1;
    else
        _f = 2;
})(), _f);
const c2 = ((() => {
    // only track the last expr
    if (a2)
        1;
    else
        2;
    try {
        if (a2)
            1;
        else
            2;
        if (a2)
            1;
        else
            2;
    }
    catch (e) {
        {
            e;
        }
    }
    finally { }
})(), _g);
