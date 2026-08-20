// @target: es5, es2015
// @strict: false
for (let v of []) {
    let v;
    for (let v of [v]) {
        const v;
    }
}