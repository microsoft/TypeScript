// @target: es2015
// @noEmit: true

type MyExclude<T, U> = T & not U;
type Simplify<T> = { [Key in keyof T]: T[Key] };
type OptionalKeys<T extends object> = {
    [Key in keyof T]: undefined extends T[Key] ? Key : never;
}[keyof T];
type RequiredKeys<T extends object> = MyExclude<keyof T, OptionalKeys<T>>;

interface Schema<Output> {
    output: Output;
}

type Shape = { [key: string]: Schema<any> };

interface ObjectSchema<
    T extends Shape,
    Output = Simplify<
        { [Key in OptionalKeys<T>]?: T[Key] } &
        { [Key in RequiredKeys<T>]: T[Key] }
    >
> extends Schema<Output> {
    shape: T;
}

type InferShape<T> = T extends ObjectSchema<infer Result>
    ? Result extends Shape ? Result : never
    : never;