// @strict: true
// @noEmit: true

type HandleOptions<O> = {
    [I in keyof O]: {
        value: O[I];
    };
};

declare function func1<
    T extends Record<PropertyKey, readonly any[]>,
>(fields: {
    [K in keyof T]: {
        label: string;
        options: [...HandleOptions<T[K]>];
    };
}): T;

const result = func1({
    prop: {
        label: "first",
        options: [
            {
                value: 123,
            },
            {
                value: "foo",
            },
        ],
    },
    other: {
        label: "second",
        options: [
            {
                value: "bar",
            },
            {
                value: true,
            },
        ],
    },
});
