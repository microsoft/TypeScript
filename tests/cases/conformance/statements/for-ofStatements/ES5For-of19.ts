// @target: es5, es2015
// @ignoreDeprecations: 6.0
// @strict: false
// @alwaysStrict: true, false
for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}
