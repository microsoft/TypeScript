//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames31_ES6.ts] ////

//// [computedPropertyNames31_ES6.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        () => {
            var obj = {
                [super.bar()]() { } // needs capture
            };
        }
        return 0;
    }
}

//// [computedPropertyNames31_ES6.js]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        () => {
            var obj = {
                [super.bar()]() { } // needs capture
            };
        };
        return 0;
    }
}
