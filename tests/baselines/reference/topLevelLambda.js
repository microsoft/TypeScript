//// [topLevelLambda.ts]
module M {
	var f = () => {this.window;}
}


//// [topLevelLambda.js]
var M = M || (M = {});
(function (M) {
    var _this = this;
    var f = function () { _this.window; };
})(M);
