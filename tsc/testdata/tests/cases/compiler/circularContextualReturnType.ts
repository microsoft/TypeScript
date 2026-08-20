// @target: es2015
// @strict: true

// Repro from #17711

Object.freeze({
    foo() {
        return Object.freeze('a');
    },
});
