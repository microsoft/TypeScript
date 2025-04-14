//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames21_ES6.ts] ////

//// [computedPropertyNames21_ES6.ts]
class C {
    bar() {
        return 0;
    }
    [this.bar()]() { }
}

//// [computedPropertyNames21_ES6.js]
class C {
    bar() {
        return 0;
    }
    [this.bar()]() { }
}
