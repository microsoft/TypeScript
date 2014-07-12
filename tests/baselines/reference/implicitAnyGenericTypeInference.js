//// [implicitAnyGenericTypeInference.js]
var c;
c = { compareTo: function (x, y) {
        return y;
    } };
var r = c.compareTo(1, '');
