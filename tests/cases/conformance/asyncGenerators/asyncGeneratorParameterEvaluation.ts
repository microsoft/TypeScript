// @target: es2015,es2017,es2018
// @lib: esnext
// @noEmitHelpers: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/40410
async function* f1(x, y = z) {}
async function* f2({[z]: x}) {}

declare class Super { foo(): void; }
class Sub extends Super {
    async * m(x, y = z, { ...w }) { super.foo(); }
}
