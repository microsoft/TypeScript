//// [tests/cases/compiler/experimentalDecoratorMetadataUnresolvedTypeObjectInEmit.ts] ////

//// [types.d.ts]
declare namespace A {
    export namespace B {
        export namespace C {
            export namespace D {
            }
        }
    }
}
//// [usage.ts]
class Foo {
    f(@decorate user: A.B.C.D.E): void {}
}


//// [usage.js]
class Foo {
    f(user) { }
}
