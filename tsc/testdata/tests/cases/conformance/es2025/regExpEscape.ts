// @target: esnext
// @lib: es2024,es2025.regexp
// @noemit: true
// @strict: true

const regExp = new RegExp(RegExp.escape("foo.bar"));
regExp.test("foo.bar");
