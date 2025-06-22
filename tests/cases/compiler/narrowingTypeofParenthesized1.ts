// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/42203

declare const foo: string;

if ((typeof foo) === "string") {
  foo;
} else {
  foo;
}

if (typeof foo === ("string")) {
  foo;
} else {
  foo;
}
