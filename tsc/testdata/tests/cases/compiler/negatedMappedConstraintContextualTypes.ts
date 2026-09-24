// @strict: true
// @noEmit: true

type MyExtract<T, U> = T & U;
type MyExclude<T, U> = T & not U;
type MyOmit<T, K extends keyof any> = Pick<T, MyExclude<keyof T, K>>;
type Tags<Value> = Value extends { tag: infer Tag } ? Tag : never;

declare function cases<Value>(): <
    Handlers extends {
        [Tag in Tags<Value> & string]: (value: MyExtract<Value, { tag: Tag }>) => unknown;
    } & { [Tag in MyExclude<keyof Handlers, Tags<Value>>]: never }
>(handlers: Handlers) => void;

type Value = { tag: "a"; count: number } | { tag: "b"; text: string };
const match = cases<Value>();
match({
    a: value => value.count,
    b: value => value.text,
});

match({
    a: value => value.count,
    b: value => value.text,
    // Error: Additional handlers are excluded.
    extra: () => 0,
});

type Elements = {
    div: { onChange: (event: Event) => void };
    span: { onChange: (event: Event) => void };
};
type Props<Tag extends keyof Elements> = MyOmit<Elements[Tag], "onChange"> & {
    onChange: (index: number) => void;
};
declare function component<Tag extends keyof Elements = "div">(props: Props<Tag>): void;
component({ onChange: index => { const numeric: number = index; } });

type RemappedOmit<T, Keys> = { [Key in keyof T as MyExclude<Key, Keys>]: T[Key] };
type RemappedProps<Tag extends keyof Elements> = RemappedOmit<Elements[Tag], "onChange"> & {
    onChange: (index: number) => void;
};
declare function remappedComponent<Tag extends keyof Elements = "div">(props: RemappedProps<Tag>): void;
remappedComponent({ onChange: index => { const numeric: number = index; } });