// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57736

type obj = {
    foo: 1;
    bar: 2;
};

type keyContaining1<
    str extends string,
    keys extends keyof obj = keyof obj,
> = keys extends infer key extends keyof obj
    ? key extends `${string}${str}${string}`
    ? obj[key]
    : never
    : never;

type _1 = keyContaining1<"foo">;  // 1

type keyContaining2<
    str extends string,
    keys extends keyof obj = keyof obj,
> = keys extends keys
    ? keys extends `${string}${str}${string}`
    ? obj[keys]
    : never
    : never;

type _2 = keyContaining2<"foo">;  // 1
