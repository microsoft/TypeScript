//// [tests/cases/compiler/asyncFunctionReturnType.2.ts] ////

//// [asyncFunctionReturnType.2.ts]
// https://github.com/microsoft/TypeScript/issues/47291
class X {
    f = async (): Promise<this> => this;
}

//// [asyncFunctionReturnType.2.js]
class X {
    f = async () => this;
}
