// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62941

function* g() {
  let x: any = {
    *[yield 0]() {},
  };
}
