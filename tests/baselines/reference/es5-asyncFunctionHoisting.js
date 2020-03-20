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
        var a0, a1, c0, c1, a, b, _i, y_1, c;
        return __generator(this, function (_a) {
            a1 = 1;
            if (true) {
                c1 = 1;
            }
            for (a = 0; y;) {
            }
            for (b in y) {
            }
            for (_i = 0, y_1 = y; _i < y_1.length; _i++) {
                c = y_1[_i];
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
        var a0, a1, c0, c1, a, b, _b, y_2, c;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a1 = 1;
                    return [4 /*yield*/, 0];
                case 1:
                    _c.sent();
                    if (true) {
                        c1 = 1;
                    }
                    for (a = 0; y;) {
                    }
                    for (b in y) {
                    }
                    for (_b = 0, y_2 = y; _b < y_2.length; _b++) {
                        c = y_2[_b];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
