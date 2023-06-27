// @strict: false
// @strictFunctionTypes: false
// under non-strict-function-types, all the below should work
interface Foo<T> {
    member: (cb: T) => void;
}

interface Bar<T> {
    member: (cb: T) => void;
}

declare var a: Foo<string>;
declare var b: Foo<"">;

declare var a2: Bar<string>;
declare var b2: Bar<"">;

a = b;
b = a;

a2 = b2;
b2 = a2;

a = b2;
b = a2;

a2 = b;
b2 = a;