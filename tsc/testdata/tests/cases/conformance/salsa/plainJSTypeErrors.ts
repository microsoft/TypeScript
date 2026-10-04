// @outdir: out/
// @target: esnext
// @allowJS: true
// @filename: plainJSTypeErrors.js

// should error
if ({} === {}) {}

// should not error
if ({} == {}) {}
