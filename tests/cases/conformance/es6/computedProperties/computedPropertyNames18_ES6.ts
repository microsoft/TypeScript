// @target: es6
function foo() {
    var obj = {
        [this.bar]: 0
    }
}