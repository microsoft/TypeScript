// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3613

interface EntityMetadata1 {
    get tableName(): string;
    set tableName(name: string);
}

interface EntityMetadata1 {
    tableName: string;
}

interface EntityMetadata2 {
    tableName: string;
}

interface EntityMetadata2 {
    get tableName(): string;
    set tableName(name: string);
}

class Foo1 {
    accessor x: string = "abc"
}

interface Foo1 {
    x: string
}

interface Foo2 {
    x: string
}

class Foo2 {
    accessor x: string = "abc"
}
