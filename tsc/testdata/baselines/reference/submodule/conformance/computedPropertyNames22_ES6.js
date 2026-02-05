//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames22_ES6.ts] ////

//// [computedPropertyNames22_ES6.ts]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames22_ES6.js]
"use strict";
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}
