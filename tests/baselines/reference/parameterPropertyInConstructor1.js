//// [tests/cases/compiler/parameterPropertyInConstructor1.ts] ////

//// [parameterPropertyInConstructor1.ts]
declare namespace mod {
  class Customers {
    constructor(public names: string);
  }
}


//// [parameterPropertyInConstructor1.js]
