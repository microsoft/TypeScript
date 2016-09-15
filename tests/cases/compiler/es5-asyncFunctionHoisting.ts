// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var y;

async function hoisting() {
    var a0, a1 = 1;
    function z() {
        var b0, b1 = 1;
    }

    if (true) {
        var c0, c1 = 1;
    }

    for (var a = 0; y;) {

    }

    for (var b in y) {

    }

    for (var c of y) {

    }
}

async function hoistingWithAwait() {
    var a0, a1 = 1;

    function z() {
        var b0, b1 = 1;
    }

    await 0;

    if (true) {
        var c0, c1 = 1;
    }

    for (var a = 0; y;) {

    }

    for (var b in y) {

    }

    for (var c of y) {

    }
}

