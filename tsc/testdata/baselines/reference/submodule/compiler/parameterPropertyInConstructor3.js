//// [tests/cases/compiler/parameterPropertyInConstructor3.ts] ////

//// [parameterPropertyInConstructor3.ts]
class Foo {
  constructor(public constructor: string) {}
}


//// [parameterPropertyInConstructor3.js]
class Foo {
    constructor;
    constructor(constructor) {
        this.constructor = constructor;
    }
}
