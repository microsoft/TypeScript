// @strict: true

// Repros from #23800

type A<T, V> = { [P in keyof T]: T[P] extends V ? 1 : 0; };
type B<T, V> = { [P in keyof T]: T[P] extends V | object ? 1 : 0; };

let a: A<{ a: 0 | 1 }, 0> = { a: 0 };
let b: B<{ a: 0 | 1 }, 0> = { a: 0 };

function foo<T, U>(x: T) {
    let a: object = x;  // Error
    let b: U | object = x;  // Error
}
