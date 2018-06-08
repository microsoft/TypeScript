type StringKeyof<T> = Extract<keyof T, string>;

type Whatever<T, K extends StringKeyof<T>> = any;

type WithoutFoo = Whatever<{ foo: string }, "foo">; // ok

// no error on the following
type WithoutFooGeneric<P extends { foo: string }> = Whatever<P, "foo">;
