//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames18_ES6.ts] ////

//// [computedPropertyNames18_ES6.ts]
function foo() {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames18_ES6.js]
function foo() {
    var obj = {
        [this.bar]: 0
    };
}
