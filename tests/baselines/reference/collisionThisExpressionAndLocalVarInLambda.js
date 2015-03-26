//// [collisionThisExpressionAndLocalVarInLambda.ts]
declare function alert(message?: any): void;

var x = {
    doStuff: (callback) => () => {
        var _this = 2;
        return callback(this);
    }
}
alert(x.doStuff(x => alert(x)));

//// [collisionThisExpressionAndLocalVarInLambda.js]
var _this = this;
var x = {
    doStuff: function (callback) { return function () {
        var _this = 2;
        return callback(_this);
    }; }
};
alert(x.doStuff(function (x) { return alert(x); }));
