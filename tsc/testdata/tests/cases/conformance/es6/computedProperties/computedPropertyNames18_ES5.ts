// @target: es5, es2015
function foo() {
    var obj = {
        [this.bar]: 0
    }
}