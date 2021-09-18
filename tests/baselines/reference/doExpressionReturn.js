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
function returnTypeInfer() { var _a = {}, _b; try {
    var _c;
    const y = ((() => { throw _b = 1, _a; })(), _c);
}
catch (_d) {
    if (_d == _a)
        return _b;
    throw _d;
} }
function returnTypeCheck() { var _a = {}, _b; try {
    var _c;
    const y = ((() => { throw _b = 1, _a; })(), _c);
}
catch (_d) {
    if (_d == _a)
        return _b;
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
function tryCatch() { var _a = {}, _b; try {
    var _c, _d, _e;
    try {
        const y = ((() => { if (v)
            throw _a; _c = 1; })(), _c);
    }
    catch (_f) {
        if (_f == _a)
            throw _f;
        1;
    }
    try {
        const y = ((() => { if (v)
            throw _a; _d = 1; })(), _d);
    }
    catch (_g) {
        if (_g == _a)
            throw _g;
        var e = _g;
        1;
    }
    try {
        const y = ((() => { if (v)
            throw _a; _e = 1; })(), _e);
    }
    catch (_h) {
        if (_h == _a)
            throw _h;
        var { a = 1 } = _h;
        1;
    }
}
catch (_j) {
    if (_j == _a)
        return _b;
    throw _j;
} }
function avoidSignatureToBeCaptured() { var _a = {}, _b; try {
    var _c, _d, _e;
    const a = ((() => {
        try {
            if (v)
                throw _a;
            _c = 1;
        }
        catch (_f) {
            if (_f == _a)
                throw _f;
            _c = 1;
        }
    })(), _c);
    const b = ((() => {
        try {
            if (v)
                throw _a;
            _d = 1;
        }
        catch (_f) {
            if (_f == _a)
                throw _f;
            var d = _f;
            _d = 1;
        }
    })(), _d);
    const c = ((() => {
        try {
            if (v)
                throw _a;
            _e = 1;
        }
        catch (_f) {
            if (_f == _a)
                throw _f;
            var { a = 1 } = _f;
            _e = 1;
        }
    })(), _e);
}
catch (_f) {
    if (_f == _a)
        return _b;
    throw _f;
} }
