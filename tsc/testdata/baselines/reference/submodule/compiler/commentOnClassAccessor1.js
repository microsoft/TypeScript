//// [tests/cases/compiler/commentOnClassAccessor1.ts] ////

//// [commentOnClassAccessor1.ts]
class C {
  /**
   * @type {number}
   */
  get bar(): number { return 1;}
}

//// [commentOnClassAccessor1.js]
class C {
    get bar() { return 1; }
}
