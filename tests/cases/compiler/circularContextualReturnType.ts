// @strict: true

// Repro from #17711

Object.freeze({
    foo() {
        return Object.freeze('a');
    },
});
