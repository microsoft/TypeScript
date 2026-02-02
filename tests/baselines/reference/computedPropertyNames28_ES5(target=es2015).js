//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames28_ES5.ts] ////

//// [computedPropertyNames28_ES5.ts]
class Base {
}
class C extends Base {
    constructor() {
        super();
        var obj = {
            [(super(), "prop")]() { }
        };
    }
}

//// [computedPropertyNames28_ES5.js]
class Base {
}
class C extends Base {
    constructor() {
        super();
        var obj = {
            [(super(), "prop")]() { }
        };
    }
}
