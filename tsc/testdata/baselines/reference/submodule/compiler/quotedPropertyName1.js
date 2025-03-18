//// [tests/cases/compiler/quotedPropertyName1.ts] ////

//// [quotedPropertyName1.ts]
class Test1 {
  "prop1" = 0;
}

//// [quotedPropertyName1.js]
class Test1 {
    "prop1" = 0;
}
