// @strict: true
// @noEmit: true

// Repro from #54610

type A<T> = T;

type B<T> = T extends any[]
    ? never
    : A<T> extends infer key
    ? key extends keyof T
        ? B<T[key]>
        : never
    : never;

function foo<T>() {
    `${a}` as B<T>;
}
