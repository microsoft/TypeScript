//// [tests/cases/compiler/genericArrayWithoutTypeAnnotation.ts] ////

//// [genericArrayWithoutTypeAnnotation.ts]
interface IFoo<T>{
}
class Bar {
    public getBar(foo: IFoo[]) {
    }
}


//// [genericArrayWithoutTypeAnnotation.js]
"use strict";
class Bar {
    getBar(foo) {
    }
}
