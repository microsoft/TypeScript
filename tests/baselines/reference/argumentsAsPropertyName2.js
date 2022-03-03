//// [argumentsAsPropertyName2.ts]
// target: es5

function foo() {
    for (let x = 0; x < 1; ++x) {
        let i : number;
        [].forEach(function () { i });
        ({ arguments: 0 });
        ({ arguments });
        ({ arguments: arguments });
    }
}


//// [argumentsAsPropertyName2.js]
// target: es5
function foo() {
    var _loop_1 = function (x) {
        var i;
        [].forEach(function () { i; });
        ({ arguments: 0 });
        ({ arguments: arguments_1 });
        ({ arguments: arguments_1 });
    };
    var arguments_1 = arguments;
    for (var x = 0; x < 1; ++x) {
        _loop_1(x);
    }
}
