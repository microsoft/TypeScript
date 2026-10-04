// @target: es2015
// @strict: false
declare var _this: number; // no error as no code gen
var f = () => this;
_this = 10; // Error