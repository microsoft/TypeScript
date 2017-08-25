type Pairs<T> = {
    [TKey in keyof T]: {
        key: TKey;
        value: T[TKey];
    };
};

type Pair<T> = Pairs<T>[keyof T];

type FooBar = {
    foo: string;
    bar: number;
};

let pair1: Pair<FooBar> = {
    key: "foo",
    value: 3
}; // no compile error here

let pair2: Pairs<FooBar>[keyof FooBar] = {
    key: "foo",
    value: 3
}; // this does cause a compile error
