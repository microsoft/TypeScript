//// [collisionThisExpressionAndLocalVarInLambda.js]
var _this = this;
var x = {
    doStuff: function (callback) {
        return function () {
            var _this = 2;
            return callback(_this);
        };
    }
};
alert(x.doStuff(function (x) {
    return alert(x);
}));
