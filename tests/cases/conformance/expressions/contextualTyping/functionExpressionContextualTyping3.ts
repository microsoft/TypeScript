// @noImplicitAny: true

// #31114
declare function f<T>(value: T | number): void;
f((a: any) => "")
