// @declaration: true

export const o = {
    foo<M extends string>(): void { },
    bar<M extends string>(): void { },
};

export const o2 = {
    foo<T>(value: T): T { return value; },
    bar<T>(value: T): T { return value; },
    baz<T, U>(a: T, b: U): [T, U] { return [a, b]; },
};
