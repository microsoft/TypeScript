//// [computedPropertyNames18_ES5.ts]
function foo() {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames18_ES5.js]
function foo() {
    var _a;
    var obj = (_a = {},
        _a[this.bar] = 0,
        _a);
}
