//// [assignToFn.js]
var M;
(function (M) {
    var x = { f: function (n) {
            return true;
        } };

    x.f = "hello";
})(M || (M = {}));
