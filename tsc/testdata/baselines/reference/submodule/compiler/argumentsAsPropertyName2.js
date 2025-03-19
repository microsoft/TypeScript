//// [tests/cases/compiler/argumentsAsPropertyName2.ts] ////

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
    for (let x = 0; x < 1; ++x) {
        let i;
        [].forEach(function () { i; });
        ({ arguments: 0 });
        ({ arguments });
        ({ arguments: arguments });
    }
}
