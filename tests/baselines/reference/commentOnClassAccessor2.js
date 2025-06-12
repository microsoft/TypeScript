//// [tests/cases/compiler/commentOnClassAccessor2.ts] ////

//// [commentOnClassAccessor2.ts]
class C {
  /**
   * Getter.
   */
  get bar(): number { return 1;}

  /**
   * Setter.
   */
  set bar(v) { }
}

//// [commentOnClassAccessor2.js]
class C {
    /**
     * Getter.
     */
    get bar() { return 1; }
    /**
     * Setter.
     */
    set bar(v) { }
}
