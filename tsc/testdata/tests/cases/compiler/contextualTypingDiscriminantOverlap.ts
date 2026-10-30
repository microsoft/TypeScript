// @strict: true
// @exactOptionalPropertyTypes: false, true
// @noEmit: true

type Handler<T> = (value: T) => T;
type IndexedHandler = {
    [key: string]: "b" | Handler<"b">;
    value: Handler<"b">;
};
type DeclaredOptionalHandler = {
    [key: string]: "a" | "b" | undefined | Handler<"b">;
    tag?: "a";
    value: Handler<"b">;
};
type DeclaredRequiredHandler = {
    [key: string]: "b" | Handler<"b">;
    tag: "b";
    value: Handler<"b">;
};

const indexedOptional:
    | { tag: "a"; value: Handler<"a"> }
    | { tag?: "a"; value: Handler<"a"> }
    | IndexedHandler = {
        value: value => value, // error
    };

const declaredOptional:
    | { tag: "a"; value: Handler<"a"> }
    | DeclaredOptionalHandler = {
        value: value => value,
    };

const declaredRequired:
    | { tag: "a"; value: Handler<"a"> }
    | DeclaredRequiredHandler = {
        tag: "a",
        value: value => value,
    };

const indexedRequired:
    | { tag: "a"; value: Handler<"a"> }
    | IndexedHandler = {
        value: value => value, // error
    };
