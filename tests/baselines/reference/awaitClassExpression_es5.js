//// [awaitClassExpression_es5.ts]
declare class C { }
declare var p: Promise<typeof C>;

async function func(): Promise<void> {
    class D extends (await p) {
    }
}

//// [awaitClassExpression_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function () {
        var D, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = function (_super) {
                        __extends(D, _super);
                        function D() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        return D;
                    };
                    return [4 /*yield*/, p];
                case 1:
                    D = (_a.apply(void 0, [(_c.sent())]));
                    return [2 /*return*/];
            }
        });
    });
}
