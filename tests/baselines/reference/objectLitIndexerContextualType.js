//// [objectLitIndexerContextualType.js]
var x;
var y;
x = {
    s: function (t) {
        return t * t;
    }
};
x = {
    0: function (t) {
        return t * t;
    }
};
y = {
    s: function (t) {
        return t * t;
    }
};
y = {
    0: function (t) {
        return t * t;
    }
};
