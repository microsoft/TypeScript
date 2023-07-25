// @target: esnext
// @module: commonjs,system
// @noTypesAndSymbols: true
// https://github.com/microsoft/TypeScript/issues/55038

namespace A {
    export const A = 0;
}

export { A }

enum B {
    B
}

export { B }
