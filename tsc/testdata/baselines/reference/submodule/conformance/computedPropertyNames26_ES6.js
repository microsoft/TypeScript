//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames26_ES6.ts] ////

//// [computedPropertyNames26_ES6.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    // Gets emitted as super, not _super, which is consistent with
    // use of super in static properties initializers.
    [
        { [super.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames26_ES6.js]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    // Gets emitted as super, not _super, which is consistent with
    // use of super in static properties initializers.
    [{ [super.bar()]: 1 }[0]]() { }
}
