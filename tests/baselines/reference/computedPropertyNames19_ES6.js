//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames19_ES6.ts] ////

//// [computedPropertyNames19_ES6.ts]
namespace M {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames19_ES6.js]
var M;
(function (M) {
    var obj = {
        [this.bar]: 0
    };
})(M || (M = {}));
