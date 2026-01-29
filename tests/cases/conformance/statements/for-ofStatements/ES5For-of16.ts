// @target: es5, es2015
// @strict: false
for (let v of []) {
    v;
    for (let v of []) {
        var x = v;
        v++;
    }
}