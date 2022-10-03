//// [privateNameNestedClassNameConflict.ts]
class A {
    #foo: string;
    constructor() {
        class A {
            #foo: string;
        }
    }
}


//// [privateNameNestedClassNameConflict.js]
var _A_foo;
class A {
    constructor() {
        var _A_foo_1;
        _A_foo.set(this, void 0);
        class A {
            constructor() {
                _A_foo_1.set(this, void 0);
            }
        }
        _A_foo_1 = new WeakMap();
    }
}
_A_foo = new WeakMap();
