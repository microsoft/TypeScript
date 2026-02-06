// @target: es2015
// @strict: false
declare class _this { // no error - as no code generation
}
var f = () => this;
var a = new _this(); // Error