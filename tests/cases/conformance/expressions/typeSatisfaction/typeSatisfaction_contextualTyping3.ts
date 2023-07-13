// @strict: true
// @noEmit: true

// see https://github.com/microsoft/TypeScript/issues/53920#issuecomment-1516616255

const obj = {
   foo: (param = "default") => param,
} satisfies {
   [key: string]: (...params: any) => any;
};

const obj2 = {
   foo: (param = "default") => param,
} satisfies {
   [key: string]: Function;
};

type StringOrNumberFunc = (x: string | number) => any;

const fn = ((x = "ok") => null) satisfies StringOrNumberFunc;
fn();
fn(32);

