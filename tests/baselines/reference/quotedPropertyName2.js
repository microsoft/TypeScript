//// [tests/cases/compiler/quotedPropertyName2.ts] ////

//// [quotedPropertyName2.ts]
class Test1 {
  static "prop1" = 0;
}

//// [quotedPropertyName2.js]
let Test1 = (() => {
    class Test1 {
    }
    Test1["prop1"] = 0;
    return Test1;
})();
