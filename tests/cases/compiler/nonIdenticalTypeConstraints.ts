class Different {
    a: number;
    b: string;
    c: boolean;
}

class Foo<T extends Function> {
    n: T;
}
interface Foo<T extends Different> {
    y: T;
}
interface Qux<T extends Different> {
    y: T;
}
class Qux<T extends Function> {
    n: T;
}

class Bar<T extends Function> {
    n: T;
}
interface Bar<T extends Function> {
    y: T;
}
interface Baz<T extends Function> {
    y: T;
}
class Baz<T extends Function> {
    n: T;
}

class Quux<T> {
    n: T;
}
interface Quux<U> {
    m: U;
}