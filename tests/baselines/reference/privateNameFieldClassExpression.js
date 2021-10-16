//// [privateNameFieldClassExpression.ts]
class B {
    #foo = class {
        constructor() {
            console.log("hello");
        }
        static test = 123;
    };
    #foo2 = class Foo {
        static otherClass = 123;
    };
}




//// [privateNameFieldClassExpression.js]
var _B_foo, _B_foo2;
class B {
    constructor() {
        var _a, _b;
        _B_foo.set(this, (_a = class {
                constructor() {
                    console.log("hello");
                }
            },
            _a.test = 123,
            _a));
        _B_foo2.set(this, (_b = class Foo {
            },
            _b.otherClass = 123,
            _b));
    }
}
_B_foo = new WeakMap(), _B_foo2 = new WeakMap();
