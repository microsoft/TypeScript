//// [doExpressionReturn.ts]
declare let v: boolean

function returnTypeInfer() {
    const y = do { return 1 }
}

function returnTypeCheck(): string {
    const y = do { return 1 }
}

function avoidFalsePositive() {
    const y = do {
        function z() {
            return 1
        }
        1
    }
}

function tryCatch() {
    try {
        const y = do { if (v) return; 1; }
    } catch { 1 }
    try {
        const y = do { if (v) return; 1; }
    } catch (e) { 1 }
    try {
        const y = do { if (v) return; 1; }
    } catch ({ a = 1 }) { 1 }
}

function avoidSignatureToBeCaptured(): void {
    const a = do {
        try {
            if (v) return; 1;
        } catch { 1 }
    };
    const b = do {
        try {
            if (v) return; 1;
        } catch (d) { 1 }
    };
    const c = do {
        try {
            if (v) return; 1;
        } catch ({ a = 1 }) { 1 }
    };
}


//// [doExpressionReturn.js]
function returnTypeInfer() { var _a; var _b = {}, _c; try {
    const y = ((() => { throw _c = 1, _b; })(), _a);
}
catch (_d) {
    if (_d == _b)
        return _c;
    throw _d;
} }
function returnTypeCheck() { var _a; var _b = {}, _c; try {
    const y = ((() => { throw _c = 1, _b; })(), _a);
}
catch (_d) {
    if (_d == _b)
        return _c;
    throw _d;
} }
function avoidFalsePositive() {
    var _a;
    const y = ((() => {
        function z() {
            return 1;
        }
        _a = 1;
    })(), _a);
}
function tryCatch() { var _a, _b, _c; var _d = {}, _e; try {
    try {
        const y = ((() => { if (v)
            throw _d; _a = 1; })(), _a);
    }
    catch (_f) {
        if (_f == _d)
            throw _f;
        1;
    }
    try {
        const y = ((() => { if (v)
            throw _d; _b = 1; })(), _b);
    }
    catch (_g) {
        if (_g == _d)
            throw _g;
        var e = _g;
        1;
    }
    try {
        const y = ((() => { if (v)
            throw _d; _c = 1; })(), _c);
    }
    catch (_h) {
        if (_h == _d)
            throw _h;
        var { a = 1 } = _h;
        1;
    }
}
catch (_j) {
    if (_j == _d)
        return _e;
    throw _j;
} }
function avoidSignatureToBeCaptured() { var _a, _b, _c; var _d = {}, _e; try {
    const a = ((() => {
        try {
            if (v)
                throw _d;
            _a = 1;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
            _a = 1;
        }
    })(), _a);
    const b = ((() => {
        try {
            if (v)
                throw _d;
            _b = 1;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
            var d = _f;
            _b = 1;
        }
    })(), _b);
    const c = ((() => {
        try {
            if (v)
                throw _d;
            _c = 1;
        }
        catch (_f) {
            if (_f == _d)
                throw _f;
            var { a = 1 } = _f;
            _c = 1;
        }
    })(), _c);
}
catch (_f) {
    if (_f == _d)
        return _e;
    throw _f;
} }
