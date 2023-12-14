// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56778

declare const example: never;

example.foo;
example['foo'];
const { foo } = example
