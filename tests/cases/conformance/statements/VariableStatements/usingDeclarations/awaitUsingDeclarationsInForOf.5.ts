// @target: es5,esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357

declare const x: any[]

for (await using of x);

export async function test() {
  for (await using of x);
}
