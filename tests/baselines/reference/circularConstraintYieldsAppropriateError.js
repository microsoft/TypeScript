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
// https://github.com/Microsoft/TypeScript/issues/16861
class BaseType {
}
class NextType extends BaseType {
}
class Foo extends NextType {
}
const foo = new Foo();
foo.bar.test;
