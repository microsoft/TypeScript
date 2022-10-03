//// [typeArgumentInferenceApparentType2.ts]
function method<T>(iterable: Iterable<T>): T {
    function inner<U extends Iterable<T>>() {
        var u: U;
        var res: T = method(u);
    }
    return;
}

//// [typeArgumentInferenceApparentType2.js]
function method(iterable) {
    function inner() {
        var u;
        var res = method(u);
    }
    return;
}
