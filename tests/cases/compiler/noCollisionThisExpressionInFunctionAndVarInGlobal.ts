// @target: es2015
// @strict: false
// @lib: es5
var console: {
    log(val: any);
}
var _this = 5;
function x() {
    x => { console.log(this); };
}