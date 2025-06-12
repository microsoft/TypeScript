//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames18_ES5.ts] ////

//// [computedPropertyNames18_ES5.ts]
function foo() {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames18_ES5.js]
function foo() {
    var obj = {
        [this.bar]: 0
    };
}
