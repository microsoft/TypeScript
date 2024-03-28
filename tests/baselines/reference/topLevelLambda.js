//// [tests/cases/compiler/topLevelLambda.ts] ////

//// [topLevelLambda.ts]
module M {
	var f = () => {this.window;}
}


//// [topLevelLambda.js]
var M;
(function (M) {
    var _this = this;
    var f = function () { _this.window; };
})(M || (M = {}));
