//// [a.js]
function foo(a) {
    for (let a = 0; a < 10; a++) {
        // do something
    }
}

//// [out.js]
function foo(a) {
    for (var a_1 = 0; a_1 < 10; a_1++) {
        // do something
    }
}
