// @strict: true

// Repros from #43425

type Transform1<T> = ((value: string) => T) | (string extends T ? undefined : never);
type Transform2<T> = string extends T ? ((value: string) => T) | undefined : (value: string) => T;

function test<T>(f1: Transform1<T>, f2: Transform2<T>) {
    f1?.("hello");
    f2?.("hello");
}

function f1<T>(x: T | (string extends T ? null | undefined : never)) {
    let z = x!;  // NonNullable<T>
}

function f2<T, U extends null | undefined>(x: T | U) {
    let z = x!;  // NonNullable<T>
}
