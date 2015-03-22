// @target: es5
function foo() {
    var obj = {
        [this.bar]: 0
    }
}