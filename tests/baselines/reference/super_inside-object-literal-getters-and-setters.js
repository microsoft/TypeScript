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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ObjectLiteral;
(function (ObjectLiteral) {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo() {
            return super._foo;
        },
        set foo(value) {
            super._foo = value;
        },
        test: function () {
            return super._foo;
        }
    };
})(ObjectLiteral || (ObjectLiteral = {}));
var F = (function () {
    function F() {
    }
    F.prototype.test = function () { return ""; };
    return F;
})();
var SuperObjectTest = (function (_super) {
    __extends(SuperObjectTest, _super);
    function SuperObjectTest() {
        _super.apply(this, arguments);
    }
    SuperObjectTest.prototype.testing = function () {
        var test = {
            get F() {
                return super.test.call(this);
            }
        };
    };
    return SuperObjectTest;
})(F);
