//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames26_ES5.ts] ////

//// [computedPropertyNames26_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [
        { [super.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames26_ES5.js]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [{ [super.bar()]: 1 }[0]]() { }
}
