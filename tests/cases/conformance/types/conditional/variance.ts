// @strict: true

// Test cases for parameter variances affected by conditional types.

// Repro from #30047

interface Foo<T> {
  prop: T extends unknown ? true : false;
}

const foo = { prop: true } as const;
const x: Foo<1> = foo;
const y: Foo<number> = foo;
const z: Foo<number> = x;


// Repro from #30118

class Bar<T extends string> {
  private static instance: Bar<string>[] = [];

  cast(_name: ([T] extends [string] ? string : string)) { }
  
  pushThis() {
    Bar.instance.push(this);
  }
}
