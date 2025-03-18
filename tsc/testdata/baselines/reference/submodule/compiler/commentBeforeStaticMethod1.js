//// [tests/cases/compiler/commentBeforeStaticMethod1.ts] ////

//// [commentBeforeStaticMethod1.ts]
class C {
  /**
   * Returns bar
   */
  public static foo(): string {
    return "bar";
  }
}

//// [commentBeforeStaticMethod1.js]
class C {
    static foo() {
        return "bar";
    }
}
