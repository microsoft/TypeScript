// @strict: true
// @lib: esnext
// @declaration: true

// repro from https://github.com/microsoft/TypeScript/issues/53276

export const a = Symbol.toStringTag;

export class F {
    [a](){ return "" }
}

export const b = (new F())[a];
