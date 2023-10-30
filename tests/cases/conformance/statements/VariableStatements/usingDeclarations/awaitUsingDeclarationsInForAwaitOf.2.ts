// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/55555

async function test() {
  for await (await using of of of) {};
}
