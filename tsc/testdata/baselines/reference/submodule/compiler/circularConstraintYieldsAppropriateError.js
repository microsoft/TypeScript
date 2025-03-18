//// [tests/cases/compiler/circularConstraintYieldsAppropriateError.ts] ////

//// [circularConstraintYieldsAppropriateError.ts]
// https://github.com/Microsoft/TypeScript/issues/16861
class BaseType<T> {
    bar: T
}

class NextType<C extends { someProp: any }, T = C['someProp']> extends BaseType<T> {
    baz: string;
}

class Foo extends NextType<Foo> {
    someProp: {
        test: true
    }
}

const foo = new Foo();
foo.bar.test

//// [circularConstraintYieldsAppropriateError.js]
class BaseType {
    bar;
}
class NextType extends BaseType {
    baz;
}
class Foo extends NextType {
    someProp;
}
const foo = new Foo();
foo.bar.test;
