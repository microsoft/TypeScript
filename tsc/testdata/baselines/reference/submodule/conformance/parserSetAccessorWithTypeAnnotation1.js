//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserSetAccessorWithTypeAnnotation1.ts] ////

//// [parserSetAccessorWithTypeAnnotation1.ts]
class C {
   set foo(v): number {
   }
}

//// [parserSetAccessorWithTypeAnnotation1.js]
class C {
    set foo(v) {
    }
}
