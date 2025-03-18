//// [tests/cases/compiler/genericArrayWithoutTypeAnnotation.ts] ////

//// [genericArrayWithoutTypeAnnotation.ts]
interface IFoo<T>{
}
class Bar {
    public getBar(foo: IFoo[]) {
    }
}


//// [genericArrayWithoutTypeAnnotation.js]
class Bar {
    getBar(foo) {
    }
}
