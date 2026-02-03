//// [tests/cases/conformance/async/es5/asyncMethodWithSuper_es5.ts] ////

//// [asyncMethodWithSuper_es5.ts]
class A {
    x() {
    }
    y() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        // call with property access
        super.x();
        // call additional property.
        super.y();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];
    }

    // async method with assignment/destructuring on 'super' requires a binding
    async advanced() {
        const f = () => {};

        // call with property access
        super.x();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];

        // property access (assign)
        super.x = f;

        // element access (assign)
        super["x"] = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // destructuring assign with element access
        ({ f: super["x"] } = { f });
    }
}


//// [asyncMethodWithSuper_es5.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.x = function () {
    };
    A.prototype.y = function () {
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // async method with only call/get on 'super' does not require a binding
    B.prototype.simple = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a, b;
            return __generator(this, function (_a) {
                // call with property access
                _super.prototype.x.call(this);
                // call additional property.
                _super.prototype.y.call(this);
                // call with element access
                _super.prototype["x"].call(this);
                a = _super.prototype.x;
                b = _super.prototype["x"];
                return [2 /*return*/];
            });
        });
    };
    // async method with assignment/destructuring on 'super' requires a binding
    B.prototype.advanced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var f, a, b;
            return __generator(this, function (_a) {
                f = function () { };
                // call with property access
                _super.prototype.x.call(this);
                // call with element access
                _super.prototype["x"].call(this);
                a = _super.prototype.x;
                b = _super.prototype["x"];
                // property access (assign)
                _super.prototype.x = f;
                // element access (assign)
                _super.prototype["x"] = f;
                // destructuring assign with property access
                (_super.prototype.x = { f: f }.f);
                // destructuring assign with element access
                (_super.prototype["x"] = { f: f }.f);
                return [2 /*return*/];
            });
        });
    };
    return B;
}(A));
