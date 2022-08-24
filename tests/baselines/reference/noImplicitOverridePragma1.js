//// [tests/cases/conformance/pragma/noImplicitOverride/noImplicitOverridePragma1.ts] ////

//// [file1.ts]
// @ts-noImplicitOverride
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

//// [file2.ts]
// @ts-noImplicitOverride true
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

//// [file3.ts]
// @ts-noImplicitOverride false
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

//// [file4.ts]
export class A {
    method() {}
}
export class B extends A {
    method() {}
}
export class C extends A {
    override method() {}
}

//// [file1.js]
"use strict";
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
exports.__esModule = true;
exports.C = exports.B = exports.A = void 0;
// @ts-noImplicitOverride
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.method = function () { };
    return B;
}(A));
exports.B = B;
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.method = function () { };
    return C;
}(A));
exports.C = C;
//// [file2.js]
"use strict";
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
exports.__esModule = true;
exports.C = exports.B = exports.A = void 0;
// @ts-noImplicitOverride true
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.method = function () { };
    return B;
}(A));
exports.B = B;
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.method = function () { };
    return C;
}(A));
exports.C = C;
//// [file3.js]
"use strict";
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
exports.__esModule = true;
exports.C = exports.B = exports.A = void 0;
// @ts-noImplicitOverride false
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.method = function () { };
    return B;
}(A));
exports.B = B;
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.method = function () { };
    return C;
}(A));
exports.C = C;
//// [file4.js]
"use strict";
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
exports.__esModule = true;
exports.C = exports.B = exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.method = function () { };
    return B;
}(A));
exports.B = B;
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.method = function () { };
    return C;
}(A));
exports.C = C;
