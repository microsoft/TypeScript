//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames23_ES6.ts] ////

//// [computedPropertyNames23_ES6.ts]
class C {
    bar() {
        return 0;
    }
    [
        { [this.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames23_ES6.js]
class C {
    bar() {
        return 0;
    }
    [{ [this.bar()]: 1 }[0]]() { }
}
