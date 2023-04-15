// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/53780

const obj = {
   foo: (param = "default") => param,
} satisfies {
   [key: string]: (...params: any) => any;
};