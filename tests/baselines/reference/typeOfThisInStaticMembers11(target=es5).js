//// [typeOfThisInStaticMembers11.ts]
declare const foo: any;

@foo
class C {
    static a = 1;
    static b = this.a + 1;
}

const classComputedName = "classComputedName"

const D = class extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static [classComputedName] = 1;
    static foo() {
        return this.c + 1;
    }
    static get fa() {
        return this.c + 1;
    }
    static set fa(v: number) {
        this.c = v + 1;
    }
}

function ret() {
    return class extends C {
        static c = 2;
        static d = this.c + 1;
        static e = super.a + this.c + 1;
        static f = () => this.c + 1;
        static ff = function () { this.c + 1 }
        static [classComputedName] = 1;
        static foo() {
            return this.c + 1;
        }
        static get fa() {
            return this.c + 1;
        }
        static set fa(v: number) {
            this.c = v + 1;
        }
    }
}



//// [typeOfThisInStaticMembers11.js]
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
var C = /** @class */ (function () {
    function C() {
    }
    C.a = 1;
    C.b = (void 0).a + 1;
    C = __decorate([
        foo
    ], C);
    return C;
}());
var classComputedName = "classComputedName";
var D = (_b = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.foo = function () {
            return this.c + 1;
        };
        Object.defineProperty(class_1, "fa", {
            get: function () {
                return this.c + 1;
            },
            set: function (v) {
                this.c = v + 1;
            },
            enumerable: false,
            configurable: true
        });
        return class_1;
    }(C)),
    _a = classComputedName,
    _b.c = 2,
    _b.d = _b.c + 1,
    _b.e = _super.a + _b.c + 1,
    _b.f = function () { return _b.c + 1; },
    _b.ff = function () { this.c + 1; },
    _b[_a] = 1,
    _b);
function ret() {
    var _b, _c;
    return _c = /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_2.foo = function () {
                return this.c + 1;
            };
            Object.defineProperty(class_2, "fa", {
                get: function () {
                    return this.c + 1;
                },
                set: function (v) {
                    this.c = v + 1;
                },
                enumerable: false,
                configurable: true
            });
            return class_2;
        }(C)),
        _b = classComputedName,
        _c.c = 2,
        _c.d = _c.c + 1,
        _c.e = _super.a + _c.c + 1,
        _c.f = function () { return _c.c + 1; },
        _c.ff = function () { this.c + 1; },
        _c[_b] = 1,
        _c;
}
