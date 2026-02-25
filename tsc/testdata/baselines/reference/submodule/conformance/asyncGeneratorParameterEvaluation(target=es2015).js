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
"use strict";
// https://github.com/microsoft/TypeScript/issues/40410
function* f1(x_1) {
    return __awaiter(this, arguments, void 0, function* (x, y = z) { });
}
function* f2(_a) {
    return __awaiter(this, arguments, void 0, function* ({ [z]: x }) { });
}
class Sub extends Super {
    *m(x_1) {
        const _super = Object.create(null, {
            foo: { get: () => super.foo }
        });
        return __awaiter(this, arguments, void 0, function* (x, y = z, _a) { var w = __rest(_a, []); _super.foo.call(this); });
    }
}
