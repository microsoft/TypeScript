for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}
