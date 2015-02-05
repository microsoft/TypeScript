//// [computedPropertyNames19.ts]
module M {
    var obj = {
        [this.bar]: 0
    }
}

//// [computedPropertyNames19.js]
var M;
(function (M) {
    var obj = {
        [this.bar]: 0
    };
})(M || (M = {}));
