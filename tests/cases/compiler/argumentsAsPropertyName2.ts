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
