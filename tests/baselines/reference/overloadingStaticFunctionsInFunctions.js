//// [tests/cases/compiler/overloadingStaticFunctionsInFunctions.ts] ////

//// [overloadingStaticFunctionsInFunctions.ts]
function boo {
  static test()
  static test(name:string)
  static test(name?:any){ }
}

//// [overloadingStaticFunctionsInFunctions.js]
function boo() {
    test();
    test(name, string);
    test(name ?  : any);
    { }
}
