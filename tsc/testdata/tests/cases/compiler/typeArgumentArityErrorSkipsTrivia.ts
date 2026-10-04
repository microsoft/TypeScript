// @strict: true

declare function f<T>(a: T): T;

f<   string, number>("a");

f<
    string, number>("a");
