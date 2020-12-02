//// [constructorWithCapturedSuper.ts]
let oneA: A;

class A {
    constructor() {
        return oneA;
    }
}

class B extends A {
    constructor(x: number) {
        super();
        if (x === 1) {
            return;
        }
        while (x < 2) {
            return;
        }
        try {
            return
        }
        catch (e) {
            return;
        }
        finally {
            return;
        }
    }
}

class C extends A {
    constructor(x: number) {
        super();
        for (let i = 0; i < 10; ++i) {
            () => i + x;
            if (x === 1) {
                return;
            } 
        }
    }
}

class D extends A {
    constructor(x: number) {
        super();
        () => {
            return;
        }
        function foo() {
            return;
        }
    }
}

//// [constructorWithCapturedSuper.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var oneA;
var A = /** @class */ (function () {
    function A() {
        return oneA;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B(x) {
        var _this = _super.call(this) || this;
        if (x === 1) {
            return _this;
        }
        while (x < 2) {
            return _this;
        }
        try {
            return _this;
        }
        catch (e) {
            return _this;
        }
        finally {
            return _this;
        }
        return _this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(x) {
        var _this = _super.call(this) || this;
        var _loop_1 = function (i) {
            (function () { return i + x; });
            if (x === 1) {
                return { value: _this };
            }
        };
        for (var i = 0; i < 10; ++i) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return _this;
    }
    return C;
}(A));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(x) {
        var _this = _super.call(this) || this;
        (function () {
            return;
        });
        function foo() {
            return;
        }
        return _this;
    }
    return D;
}(A));
