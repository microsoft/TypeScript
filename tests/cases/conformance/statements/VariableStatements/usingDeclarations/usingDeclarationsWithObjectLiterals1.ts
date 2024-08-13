// @strict: true
// @target: esnext
// @module: esnext
// @lib: esnext
// @noEmit: true

interface MyDisposable {
  value: number;
  [Symbol.dispose](): void;
}

{
  using _ = { [Symbol.dispose]() {} };
}

{
  using _ = { [Symbol.dispose]() {}, value: 1 };
}

{
  using _: MyDisposable = { [Symbol.dispose]() {}, value: 1, extra: "foo" };
}

interface MyAsyncDisposable {
  value: number;
  [Symbol.asyncDispose](): Promise<void>;
}

async function f() {
  {
    await using _ = { async [Symbol.asyncDispose]() {} };
  }

  {
    await using _ = { async [Symbol.asyncDispose]() {}, value: 1 };
  }

  {
    await using _: MyAsyncDisposable = {
      async [Symbol.asyncDispose]() {},
      value: 1,
      extra: "foo",
    };
  }
}

export {};
