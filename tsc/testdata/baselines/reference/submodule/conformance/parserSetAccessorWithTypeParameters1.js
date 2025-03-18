//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserSetAccessorWithTypeParameters1.ts] ////

//// [parserSetAccessorWithTypeParameters1.ts]
class C {
   set foo<T>(v) { }
}

//// [parserSetAccessorWithTypeParameters1.js]
class C {
    set foo(v) { }
}
