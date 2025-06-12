//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames19_ES5.ts] ////

//// [computedPropertyNames19_ES5.ts]
module M {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames19_ES5.js]
var M;
(function (M) {
    var obj = {
        [this.bar]: 0
    };
})(M || (M = {}));
