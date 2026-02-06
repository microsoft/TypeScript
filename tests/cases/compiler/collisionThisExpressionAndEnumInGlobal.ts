// @target: es2015
// @strict: false
enum _this { // Error
    _thisVal1,
    _thisVal2,
}
var f = () => this;