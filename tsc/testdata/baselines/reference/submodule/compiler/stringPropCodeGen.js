//// [tests/cases/compiler/stringPropCodeGen.ts] ////

//// [stringPropCodeGen.ts]
var a = {

  "foo" : function() { },
  "bar" : 5

};



a.foo();

a.bar.toString();


//// [stringPropCodeGen.js]
"use strict";
var a = {
    "foo": function () { },
    "bar": 5
};
a.foo();
a.bar.toString();
