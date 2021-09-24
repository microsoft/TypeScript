//// [topLevelLambda.ts]
module M {
	var f = () => {this.window;}
}


//// [topLevelLambda.js]
var M;
(function (M) {
    var _this = this;
    var f = function f() { _this.window; };
})(M || (M = {}));
