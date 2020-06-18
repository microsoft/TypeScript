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
var _foo, _foo2;
class B {
    constructor() {
        var _a, _b;
        _foo.set(this, (_a = class {
                constructor() {
                    console.log("hello");
                }
            },
            _a.test = 123,
            _a));
        _foo2.set(this, (_b = class Foo {
            },
            _b.otherClass = 123,
            _b));
    }
}
_foo = new WeakMap(), _foo2 = new WeakMap();
