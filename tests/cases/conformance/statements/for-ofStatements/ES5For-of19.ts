// @target: es5, es2015
// @strict: false
for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}
