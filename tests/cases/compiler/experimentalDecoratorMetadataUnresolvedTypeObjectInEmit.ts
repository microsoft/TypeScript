// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: types.d.ts
declare namespace A {
    export namespace B {
        export namespace C {
            export namespace D {
            }
        }
    }
}
// @filename: usage.ts
class Foo {
    f(@decorate user: A.B.C.D.E): void {}
}
