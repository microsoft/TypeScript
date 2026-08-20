//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserGetAccessorWithTypeParameters1.ts] ////

//// [parserGetAccessorWithTypeParameters1.ts]
class C {
  get foo<T>() { }
}

//// [parserGetAccessorWithTypeParameters1.js]
"use strict";
class C {
    get foo() { }
}
