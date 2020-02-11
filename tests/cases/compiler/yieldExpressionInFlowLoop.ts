// @noImplicitAny: true
// @target: es6

function* f() {
    let result;
    while (1) {
        result = yield result;
    }
}
