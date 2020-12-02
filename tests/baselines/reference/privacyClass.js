//// [privacyClass.ts]
export module m1 {
    export interface m1_i_public {
    }

    interface m1_i_private {
    }

    export class m1_c_public {
        private f1() {
        }
    }

    class m1_c_private {
    }

    class m1_C1_private extends m1_c_public {
    }
    class m1_C2_private extends m1_c_private {
    }
    export class m1_C3_public extends m1_c_public {
    }
    export class m1_C4_public extends m1_c_private {
    }

    class m1_C5_private implements m1_i_public {
    }
    class m1_C6_private implements m1_i_private {
    }
    export class m1_C7_public implements m1_i_public {
    }
    export class m1_C8_public implements m1_i_private {
    }

    class m1_C9_private extends m1_c_public implements m1_i_private, m1_i_public {
    }
    class m1_C10_private extends m1_c_private implements  m1_i_private, m1_i_public {
    }
    export class m1_C11_public extends m1_c_public implements  m1_i_private, m1_i_public {
    }
    export class m1_C12_public extends m1_c_private implements  m1_i_private, m1_i_public {
    }
}


module m2 {
    export interface m2_i_public {
    }

    interface m2_i_private {
    }

    export class m2_c_public {
        private f1() {
        }
    }

    class m2_c_private {
    }

    class m2_C1_private extends m2_c_public {
    }
    class m2_C2_private extends m2_c_private {
    }
    export class m2_C3_public extends m2_c_public {
    }
    export class m2_C4_public extends m2_c_private {
    }

    class m2_C5_private implements m2_i_public {
    }
    class m2_C6_private implements m2_i_private {
    }
    export class m2_C7_public implements m2_i_public {
    }
    export class m2_C8_public implements m2_i_private {
    }

    class m2_C9_private extends m2_c_public implements m2_i_private, m2_i_public {
    }
    class m2_C10_private extends m2_c_private implements  m2_i_private, m2_i_public {
    }
    export class m2_C11_public extends m2_c_public implements  m2_i_private, m2_i_public {
    }
    export class m2_C12_public extends m2_c_private implements  m2_i_private, m2_i_public {
    }
}

export interface glo_i_public {
}

interface glo_i_private {
}

export class glo_c_public {
    private f1() {
    }
}

class glo_c_private {
}

class glo_C1_private extends glo_c_public {
}
class glo_C2_private extends glo_c_private {
}
export class glo_C3_public extends glo_c_public {
}
export class glo_C4_public extends glo_c_private {
}

class glo_C5_private implements glo_i_public {
}
class glo_C6_private implements glo_i_private {
}
export class glo_C7_public implements glo_i_public {
}
export class glo_C8_public implements glo_i_private {
}

class glo_C9_private extends glo_c_public implements glo_i_private, glo_i_public {
}
class glo_C10_private extends glo_c_private implements  glo_i_private, glo_i_public {
}
export class glo_C11_public extends glo_c_public implements  glo_i_private, glo_i_public {
}
export class glo_C12_public extends glo_c_private implements  glo_i_private, glo_i_public {
}

//// [privacyClass.js]
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
exports.glo_C12_public = exports.glo_C11_public = exports.glo_C8_public = exports.glo_C7_public = exports.glo_C4_public = exports.glo_C3_public = exports.glo_c_public = exports.m1 = void 0;
var m1;
(function (m1) {
    var m1_c_public = /** @class */ (function () {
        function m1_c_public() {
        }
        m1_c_public.prototype.f1 = function () {
        };
        return m1_c_public;
    }());
    m1.m1_c_public = m1_c_public;
    var m1_c_private = /** @class */ (function () {
        function m1_c_private() {
        }
        return m1_c_private;
    }());
    var m1_C1_private = /** @class */ (function (_super) {
        __extends(m1_C1_private, _super);
        function m1_C1_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C1_private;
    }(m1_c_public));
    var m1_C2_private = /** @class */ (function (_super) {
        __extends(m1_C2_private, _super);
        function m1_C2_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C2_private;
    }(m1_c_private));
    var m1_C3_public = /** @class */ (function (_super) {
        __extends(m1_C3_public, _super);
        function m1_C3_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C3_public;
    }(m1_c_public));
    m1.m1_C3_public = m1_C3_public;
    var m1_C4_public = /** @class */ (function (_super) {
        __extends(m1_C4_public, _super);
        function m1_C4_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C4_public;
    }(m1_c_private));
    m1.m1_C4_public = m1_C4_public;
    var m1_C5_private = /** @class */ (function () {
        function m1_C5_private() {
        }
        return m1_C5_private;
    }());
    var m1_C6_private = /** @class */ (function () {
        function m1_C6_private() {
        }
        return m1_C6_private;
    }());
    var m1_C7_public = /** @class */ (function () {
        function m1_C7_public() {
        }
        return m1_C7_public;
    }());
    m1.m1_C7_public = m1_C7_public;
    var m1_C8_public = /** @class */ (function () {
        function m1_C8_public() {
        }
        return m1_C8_public;
    }());
    m1.m1_C8_public = m1_C8_public;
    var m1_C9_private = /** @class */ (function (_super) {
        __extends(m1_C9_private, _super);
        function m1_C9_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C9_private;
    }(m1_c_public));
    var m1_C10_private = /** @class */ (function (_super) {
        __extends(m1_C10_private, _super);
        function m1_C10_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C10_private;
    }(m1_c_private));
    var m1_C11_public = /** @class */ (function (_super) {
        __extends(m1_C11_public, _super);
        function m1_C11_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C11_public;
    }(m1_c_public));
    m1.m1_C11_public = m1_C11_public;
    var m1_C12_public = /** @class */ (function (_super) {
        __extends(m1_C12_public, _super);
        function m1_C12_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m1_C12_public;
    }(m1_c_private));
    m1.m1_C12_public = m1_C12_public;
})(m1 = exports.m1 || (exports.m1 = {}));
var m2;
(function (m2) {
    var m2_c_public = /** @class */ (function () {
        function m2_c_public() {
        }
        m2_c_public.prototype.f1 = function () {
        };
        return m2_c_public;
    }());
    m2.m2_c_public = m2_c_public;
    var m2_c_private = /** @class */ (function () {
        function m2_c_private() {
        }
        return m2_c_private;
    }());
    var m2_C1_private = /** @class */ (function (_super) {
        __extends(m2_C1_private, _super);
        function m2_C1_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C1_private;
    }(m2_c_public));
    var m2_C2_private = /** @class */ (function (_super) {
        __extends(m2_C2_private, _super);
        function m2_C2_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C2_private;
    }(m2_c_private));
    var m2_C3_public = /** @class */ (function (_super) {
        __extends(m2_C3_public, _super);
        function m2_C3_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C3_public;
    }(m2_c_public));
    m2.m2_C3_public = m2_C3_public;
    var m2_C4_public = /** @class */ (function (_super) {
        __extends(m2_C4_public, _super);
        function m2_C4_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C4_public;
    }(m2_c_private));
    m2.m2_C4_public = m2_C4_public;
    var m2_C5_private = /** @class */ (function () {
        function m2_C5_private() {
        }
        return m2_C5_private;
    }());
    var m2_C6_private = /** @class */ (function () {
        function m2_C6_private() {
        }
        return m2_C6_private;
    }());
    var m2_C7_public = /** @class */ (function () {
        function m2_C7_public() {
        }
        return m2_C7_public;
    }());
    m2.m2_C7_public = m2_C7_public;
    var m2_C8_public = /** @class */ (function () {
        function m2_C8_public() {
        }
        return m2_C8_public;
    }());
    m2.m2_C8_public = m2_C8_public;
    var m2_C9_private = /** @class */ (function (_super) {
        __extends(m2_C9_private, _super);
        function m2_C9_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C9_private;
    }(m2_c_public));
    var m2_C10_private = /** @class */ (function (_super) {
        __extends(m2_C10_private, _super);
        function m2_C10_private() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C10_private;
    }(m2_c_private));
    var m2_C11_public = /** @class */ (function (_super) {
        __extends(m2_C11_public, _super);
        function m2_C11_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C11_public;
    }(m2_c_public));
    m2.m2_C11_public = m2_C11_public;
    var m2_C12_public = /** @class */ (function (_super) {
        __extends(m2_C12_public, _super);
        function m2_C12_public() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return m2_C12_public;
    }(m2_c_private));
    m2.m2_C12_public = m2_C12_public;
})(m2 || (m2 = {}));
var glo_c_public = /** @class */ (function () {
    function glo_c_public() {
    }
    glo_c_public.prototype.f1 = function () {
    };
    return glo_c_public;
}());
exports.glo_c_public = glo_c_public;
var glo_c_private = /** @class */ (function () {
    function glo_c_private() {
    }
    return glo_c_private;
}());
var glo_C1_private = /** @class */ (function (_super) {
    __extends(glo_C1_private, _super);
    function glo_C1_private() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C1_private;
}(glo_c_public));
var glo_C2_private = /** @class */ (function (_super) {
    __extends(glo_C2_private, _super);
    function glo_C2_private() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C2_private;
}(glo_c_private));
var glo_C3_public = /** @class */ (function (_super) {
    __extends(glo_C3_public, _super);
    function glo_C3_public() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C3_public;
}(glo_c_public));
exports.glo_C3_public = glo_C3_public;
var glo_C4_public = /** @class */ (function (_super) {
    __extends(glo_C4_public, _super);
    function glo_C4_public() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C4_public;
}(glo_c_private));
exports.glo_C4_public = glo_C4_public;
var glo_C5_private = /** @class */ (function () {
    function glo_C5_private() {
    }
    return glo_C5_private;
}());
var glo_C6_private = /** @class */ (function () {
    function glo_C6_private() {
    }
    return glo_C6_private;
}());
var glo_C7_public = /** @class */ (function () {
    function glo_C7_public() {
    }
    return glo_C7_public;
}());
exports.glo_C7_public = glo_C7_public;
var glo_C8_public = /** @class */ (function () {
    function glo_C8_public() {
    }
    return glo_C8_public;
}());
exports.glo_C8_public = glo_C8_public;
var glo_C9_private = /** @class */ (function (_super) {
    __extends(glo_C9_private, _super);
    function glo_C9_private() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C9_private;
}(glo_c_public));
var glo_C10_private = /** @class */ (function (_super) {
    __extends(glo_C10_private, _super);
    function glo_C10_private() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C10_private;
}(glo_c_private));
var glo_C11_public = /** @class */ (function (_super) {
    __extends(glo_C11_public, _super);
    function glo_C11_public() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C11_public;
}(glo_c_public));
exports.glo_C11_public = glo_C11_public;
var glo_C12_public = /** @class */ (function (_super) {
    __extends(glo_C12_public, _super);
    function glo_C12_public() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glo_C12_public;
}(glo_c_private));
exports.glo_C12_public = glo_C12_public;
