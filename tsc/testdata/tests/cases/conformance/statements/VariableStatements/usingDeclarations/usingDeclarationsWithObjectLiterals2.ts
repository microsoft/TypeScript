// @strictNullChecks: false
// @noImplicitAny: true, false
// @target: esnext
// @module: esnext
// @lib: esnext
// @noEmit: true

{
  using _ = { [Symbol.dispose]() {}, value: null };
}

async function f() {
  {
    await using _ = { async [Symbol.asyncDispose]() {}, value: null };
  }
}

export {};
