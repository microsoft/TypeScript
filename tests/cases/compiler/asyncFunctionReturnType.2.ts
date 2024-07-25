// @target: esnext

// https://github.com/microsoft/TypeScript/issues/47291
class X {
    f = async (): Promise<this> => this;
}