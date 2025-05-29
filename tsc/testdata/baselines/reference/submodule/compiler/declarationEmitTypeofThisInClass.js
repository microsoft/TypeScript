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


//// [declarationEmitTypeofThisInClass.d.ts]
declare class Foo {
    foo!: string;
    bar!: typeof this.foo; //Public property 'bar' of exported class has or is using private name 'this'.(4031)
}


//// [DtsFileErrors]


declarationEmitTypeofThisInClass.d.ts(2,8): error TS1255: A definite assignment assertion '!' is not permitted in this context.
declarationEmitTypeofThisInClass.d.ts(3,8): error TS1255: A definite assignment assertion '!' is not permitted in this context.


==== declarationEmitTypeofThisInClass.d.ts (2 errors) ====
    declare class Foo {
        foo!: string;
           ~
!!! error TS1255: A definite assignment assertion '!' is not permitted in this context.
        bar!: typeof this.foo; //Public property 'bar' of exported class has or is using private name 'this'.(4031)
           ~
!!! error TS1255: A definite assignment assertion '!' is not permitted in this context.
    }
    