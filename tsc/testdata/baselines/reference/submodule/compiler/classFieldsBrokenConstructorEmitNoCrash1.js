//// [tests/cases/compiler/classFieldsBrokenConstructorEmitNoCrash1.ts] ////

//// [classFieldsBrokenConstructorEmitNoCrash1.ts]
class Test {
  prop = 42;
  constructor
}


//// [classFieldsBrokenConstructorEmitNoCrash1.js]
class Test {
    prop = 42;
}
