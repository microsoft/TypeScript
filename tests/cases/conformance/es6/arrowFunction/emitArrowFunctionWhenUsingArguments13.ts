// @target: es5

function f() {
    var _arguments = 10;
    var a = (arguments) => () => _arguments;
}