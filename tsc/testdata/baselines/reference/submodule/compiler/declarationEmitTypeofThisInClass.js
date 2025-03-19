//// [tests/cases/compiler/declarationEmitTypeofThisInClass.ts] ////

//// [declarationEmitTypeofThisInClass.ts]
class Foo {
    public foo!: string
    public bar!: typeof this.foo //Public property 'bar' of exported class has or is using private name 'this'.(4031)
}

//// [declarationEmitTypeofThisInClass.js]
class Foo {
    foo;
    bar; //Public property 'bar' of exported class has or is using private name 'this'.(4031)
}
