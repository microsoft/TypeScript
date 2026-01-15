// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/55555

{
  for (await using of of of) {};
}
