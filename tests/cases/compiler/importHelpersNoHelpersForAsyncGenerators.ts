// @importHelpers: true
// @target: es5
// @module: commonjs
// @lib: esnext
// @moduleResolution: classic
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: main.ts
export async function * f() {
    await 1;
    yield 2;
    yield* [3];
}

// @filename: tslib.d.ts
export {}
