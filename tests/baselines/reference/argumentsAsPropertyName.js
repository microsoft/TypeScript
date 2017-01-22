//// [argumentsAsPropertyName.ts]
// target: es5
type MyType = {
    arguments: Array<string>
}

declare function use(s: any);

function myFunction(myType: MyType) {
    for (let i = 0; i < 10; i++) {
        use(myType.arguments[i]);
        // create closure so that tsc will turn loop body into function
        const x = 5;
        [1, 2, 3].forEach(function(j) { use(x); })
    }
}

//// [argumentsAsPropertyName.js]
function myFunction(myType) {
    var _loop_1 = function (i) {
        use(myType.arguments[i]);
        // create closure so that tsc will turn loop body into function
        var x = 5;
        [1, 2, 3].forEach(function (j) { use(x); });
    };
    for (var i = 0; i < 10; i++) {
        _loop_1(i);
    }
}
