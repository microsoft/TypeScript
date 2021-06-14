//// [doExpressionReturn.ts]
function x() {
    const y = do { return }
}

function w() {
    const y = do {
        function z() {
            return
        }
        1
     }
}

function z() {
    try {
        const y = do { return }
    } catch {}
    try {
        const y = do { return }
    } catch(e) {}
    try {
        const y = do { return }
    } catch ({ a = 1 }) {}
}

function q() {
    (do {
        try {
            return
        } catch {}
    });
    (do {
        try {
            return
        } catch(d) {}
    });
    (do {
        try {
            return
        } catch({a = 1}) {}
    });
}


//// [doExpressionReturn.js]
function x() { var _a; var _b = {}, _c; try {
    const y = ((() => { throw _b; })(), _a);
}
catch (_d) {
    if (_d == _b)
        return _c;
    throw _d;
} }
function w() {
    var _a;
    const y = ((() => {
        function z() {
            return;
        }
        _a = 1;
    })(), _a);
}
function z() { var _a, _b, _c; var _d = {}, _e; try {
    try {
        const y = ((() => { throw _d; })(), _a);
    }
    catch (_f) {
        if (_f == _d)
            throw _f;
    }
    try {
        const y = ((() => { throw _d; })(), _b);
    }
    catch (_g) {
        if (_g == _d)
            throw _g;
        var e = _g;
    }
    try {
        const y = ((() => { throw _d; })(), _c);
    }
    catch (_h) {
        if (_h == _d)
            throw _h;
        var { a = 1 } = _h;
    }
}
catch (_j) {
    if (_j == _d)
        return _e;
    throw _j;
} }
function q() { var _a, _b, _c; var _d = {}, _e; try {
    ((() => {
        try {
            throw _d;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
        }
    })(), _a);
    ((() => {
        try {
            throw _d;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
            var d = _f;
        }
    })(), _b);
    ((() => {
        try {
            throw _d;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
            var { a = 1 } = _f;
        }
    })(), _c);
}
catch (_f) {
    if (_f == _d)
        return _e;
    throw _f;
} }
