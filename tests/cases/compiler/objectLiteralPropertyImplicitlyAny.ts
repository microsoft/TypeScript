// @target: esnext
// @noImplicitAny: true

const foo = Symbol.for("foo");
const o = { [foo]: undefined };
