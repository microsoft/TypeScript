//// [tests/cases/conformance/asyncGenerators/asyncGeneratorParameterEvaluation.ts] ////

//// [asyncGeneratorParameterEvaluation.ts]
// https://github.com/microsoft/TypeScript/issues/40410
async function* f1(x, y = z) {}
async function* f2({[z]: x}) {}

declare class Super { foo(): void; }
class Sub extends Super {
    async * m(x, y = z, { ...w }) { super.foo(); }
}


//// [asyncGeneratorParameterEvaluation.js]
// https://github.com/microsoft/TypeScript/issues/40410
function f1(x_1) { return __asyncGenerator(this, arguments, function* f1_1(x, y = z) { }); }
function f2(_a) { return __asyncGenerator(this, arguments, function* f2_1({ [z]: x }) { }); }
class Sub extends Super {
    m(x_1) { const _super = Object.create(null, {
        foo: { get: () => super.foo }
    }); return __asyncGenerator(this, arguments, function* m_1(x, y = z, _a) { var w = __rest(_a, []); _super.foo.call(this); }); }
}
