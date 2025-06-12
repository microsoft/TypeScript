//// [tests/cases/compiler/es5-asyncFunctionTryStatements.ts] ////

//// [es5-asyncFunctionTryStatements.ts]
declare var x: any, y: any, z: any, a: any, b: any, c: any;

async function tryCatch0() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch1() {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch2() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        await y;
    }
}

async function tryCatch3(): Promise<Function> {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        return () => e;
    }
}
async function tryFinally0() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        y;
    }
}

async function tryFinally1() {
    var x: any, y: any;
    try {
        await x;
    }
    finally {
        y;
    }
}

async function tryFinally2() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        await y;
    }
}

async function tryCatchFinally0() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally1() {
    var x: any, y: any, z: any;
    try {
        await x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally2() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        await y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally3() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        await z;
    }
}

//// [es5-asyncFunctionTryStatements.js]
function tryCatch0() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            x;
        }
        catch (e) {
            y;
        }
    });
}
function tryCatch1() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            yield x;
        }
        catch (e) {
            y;
        }
    });
}
function tryCatch2() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            x;
        }
        catch (e) {
            yield y;
        }
    });
}
function tryCatch3() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            yield x;
        }
        catch (e) {
            return () => e;
        }
    });
}
function tryFinally0() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            x;
        }
        finally {
            y;
        }
    });
}
function tryFinally1() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            yield x;
        }
        finally {
            y;
        }
    });
}
function tryFinally2() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y;
        try {
            x;
        }
        finally {
            yield y;
        }
    });
}
function tryCatchFinally0() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y, z;
        try {
            x;
        }
        catch (e) {
            y;
        }
        finally {
            z;
        }
    });
}
function tryCatchFinally1() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y, z;
        try {
            yield x;
        }
        catch (e) {
            y;
        }
        finally {
            z;
        }
    });
}
function tryCatchFinally2() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y, z;
        try {
            x;
        }
        catch (e) {
            yield y;
        }
        finally {
            z;
        }
    });
}
function tryCatchFinally3() {
    return __awaiter(this, void 0, void 0, function* () {
        var x, y, z;
        try {
            x;
        }
        catch (e) {
            y;
        }
        finally {
            yield z;
        }
    });
}
