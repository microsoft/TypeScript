//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames25_ES6.ts] ////

//// [computedPropertyNames25_ES6.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        var obj = {
            [super.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames25_ES6.js]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    foo() {
        var obj = {
            [super.bar()]() { }
        };
        return 0;
    }
}
