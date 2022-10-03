//// [stringPropCodeGen.ts]
var a = {

  "foo" : function() { },
  "bar" : 5

};



a.foo();

a.bar.toString();


//// [stringPropCodeGen.js]
var a = {
    "foo": function () { },
    "bar": 5
};
a.foo();
a.bar.toString();
