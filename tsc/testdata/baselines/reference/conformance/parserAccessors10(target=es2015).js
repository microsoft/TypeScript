//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserAccessors10.ts] ////

//// [parserAccessors10.ts]
var v = {
  public get foo() { }
};

//// [parserAccessors10.js]
"use strict";
var v = {
    get foo() { }
};
