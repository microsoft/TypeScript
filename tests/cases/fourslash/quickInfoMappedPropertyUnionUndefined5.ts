// @strict: true

// https://github.com/microsoft/TypeScript/issues/62325

//// type RequiredKeys<T extends object> = {
////   [K in keyof Required<T>]: T[K];
//// };
////
//// type Foo = {
////   a?: string;
////   b?: number;
////   c: string;
////   d: boolean | undefined;
//// };
////
//// type Bar/*1*/ = RequiredKeys<Foo>;

verify.quickInfoAt("1", `type Bar = {
    a: string | undefined;
    b: number | undefined;
    c: string;
    d: boolean | undefined;
}`);
