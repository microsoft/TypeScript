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
var _foo;
class A {
    constructor() {
        _foo.set(this, void 0);
        var _foo_1;
        var _foo_1;
        class A {
            constructor() {
                _foo_1.set(this, void 0);
            }
        }
        _foo_1 = new WeakMap();
    }
}
_foo = new WeakMap();
