//// [tests/cases/compiler/super_inside-object-literal-getters-and-setters.ts] ////

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
class F {
    test() { return ""; }
}
class SuperObjectTest extends F {
    testing() {
        var test = {
            get F() {
                return super.test();
            }
        };
    }
}
