//// [es5-asyncFunctionHoisting.ts]
declare var y;

async function hoisting() {
    var a0, a1 = 1;
    function z() {
        var b0, b1 = 1;
    }

    if (true) {
        var c0, c1 = 1;
    }

    for (var a = 0; y;) {

    }

    for (var b in y) {

    }

    for (var c of y) {

    }
}

async function hoistingWithAwait() {
    var a0, a1 = 1;

    function z() {
        var b0, b1 = 1;
    }

    await 0;

    if (true) {
        var c0, c1 = 1;
    }

    for (var a = 0; y;) {

    }

    for (var b in y) {

    }

    for (var c of y) {

    }
}



//// [es5-asyncFunctionHoisting.js]
function hoisting() {
    return __awaiter(this, void 0, void 0, function () {
        function z() {
            var b0, b1 = 1;
        }
        var a0, a1, c0, c1, a, b, y_1, c, e_1;
        return __generator(this, function (_a) {
            a1 = 1;
            if (true) {
                c1 = 1;
            }
            for (a = 0; y;) {
            }
            for (b in y) {
            }
            try {
                for (y_1 = { iterator: __values(y) }; __step(y_1);) {
                    c = y_1.result.value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try { __close(y_1); } finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/];
        });
    });
}
function hoistingWithAwait() {
    return __awaiter(this, void 0, void 0, function () {
        function z() {
            var b0, b1 = 1;
        }
        var a0, a1, c0, c1, a, b, y_2, c, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a1 = 1;
                    return [4 /*yield*/, 0];
                case 1:
                    _a.sent();
                    if (true) {
                        c1 = 1;
                    }
                    for (a = 0; y;) {
                    }
                    for (b in y) {
                    }
                    try {
                        for (y_2 = { iterator: __values(y) }; __step(y_2);) {
                            c = y_2.result.value;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try { __close(y_2); } finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
