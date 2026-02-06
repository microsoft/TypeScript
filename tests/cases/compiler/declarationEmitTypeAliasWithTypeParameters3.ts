// @target: es2015
// @declaration: true

type Foo<T> = {
    foo<U>(): Foo<U>
};
function bar() {
    return {} as Foo<number>;
}
