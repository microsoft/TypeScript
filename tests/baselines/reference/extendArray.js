//// [extendArray.js]
var a = [1, 2];
a.forEach(function (v, i, a) {
});

var arr = Array.prototype;
arr.collect = function (fn) {
    var res = [];
    for (var i = 0; i < this.length; ++i) {
        var tmp = fn(this[i]);
        for (var j = 0; j < tmp.length; ++j) {
            res.push(tmp[j]);
        }
    }
    return res;
};
