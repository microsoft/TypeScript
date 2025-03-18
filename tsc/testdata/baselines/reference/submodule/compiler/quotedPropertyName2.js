//// [tests/cases/compiler/quotedPropertyName2.ts] ////

//// [quotedPropertyName2.ts]
class Test1 {
  static "prop1" = 0;
}

//// [quotedPropertyName2.js]
class Test1 {
    static "prop1" = 0;
}
