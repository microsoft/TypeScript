//// [tests/cases/compiler/generatorES6_4.ts] ////

//// [generatorES6_4.ts]
var v = { 
   *foo() {
       yield 0
   }
}

//// [generatorES6_4.js]
var v = {
    *foo() {
        yield 0;
    }
};
