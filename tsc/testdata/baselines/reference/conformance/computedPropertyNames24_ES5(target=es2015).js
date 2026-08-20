//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames24_ES5.ts] ////

//// [computedPropertyNames24_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [super.bar()]() { }
}

//// [computedPropertyNames24_ES5.js]
"use strict";
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [super.bar()]() { }
}
