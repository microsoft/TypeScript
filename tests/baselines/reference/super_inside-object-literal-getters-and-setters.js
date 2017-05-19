//// [super_inside-object-literal-getters-and-setters.ts]
module ObjectLiteral {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo(): string {
            return super._foo;
        },
        set foo(value: string) {
            super._foo = value;
        },
        test: function () {
            return super._foo;
        }
    }
}

class F { public test(): string { return ""; } }
class SuperObjectTest extends F {
    public testing() {
        var test = {
            get F() {
                return super.test();
            }
        };
    }
}



//// [super_inside-object-literal-getters-and-setters.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ObjectLiteral;
(function (ObjectLiteral) {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo() {
            return _super._foo;
        },
        set foo(value) {
            _super._foo = value;
        },
        test: function () {
            return _super._foo;
        }
    };
})(ObjectLiteral || (ObjectLiteral = {}));
var F = (function () {
    function F() {
    }
    F.prototype.test = function () { return ""; };
    return F;
}());
var SuperObjectTest = (function (_super) {
    __extends(SuperObjectTest, _super);
    function SuperObjectTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuperObjectTest.prototype.testing = function () {
        var test = {
            get F() {
                return _super.test.call(this);
            }
        };
    };
    return SuperObjectTest;
}(F));
