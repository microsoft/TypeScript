//// [nonArrayRestArgs.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        rest[_i] = arguments[_i + 0];
    }
    var x = rest[0];
    return x;
}
