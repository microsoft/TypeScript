//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames22_ES5.ts] ////

//// [computedPropertyNames22_ES5.ts]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames22_ES5.js]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}
