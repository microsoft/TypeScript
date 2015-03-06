//// [computedPropertyNames19_ES5.ts]
module M {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames19_ES5.js]
var M;
(function (M) {
    var obj = (_a = {},
        _a[this.bar] = 0,
        _a);
    var _a;
})(M || (M = {}));
