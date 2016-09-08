module X {
    export enum Foo {
        A, B
    }
}
module Y {
    export enum Foo {
        A, B
    }
}
const y: X.Foo | boolean = Y.Foo.A;
