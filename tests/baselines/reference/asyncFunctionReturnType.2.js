//// [asyncFunctionReturnType.2.ts]
// https://github.com/microsoft/TypeScript/issues/47291
class X {
    f = async (): Promise<this> => this;
}

//// [asyncFunctionReturnType.2.js]
// https://github.com/microsoft/TypeScript/issues/47291
class X {
    f = async () => this;
}
