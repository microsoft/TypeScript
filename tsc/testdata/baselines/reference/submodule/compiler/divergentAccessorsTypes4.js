//// [tests/cases/compiler/divergentAccessorsTypes4.ts] ////

//// [divergentAccessorsTypes4.ts]
class One {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  prop2: number;
}

class Two {
  get prop1(): "hello" { return "hello"; }
  set prop1(s: "hello" | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string | 42) { }

}

declare const i: One & Two;

// "hello"
i.prop1;
// number | "hello"
i.prop1 = 42;
i.prop1 = "hello";

// never
i.prop2;
// 42
i.prop2 = 42;
i.prop2 = "hello"; // error


//// [divergentAccessorsTypes4.js]
class One {
    get prop1() { return ""; }
    set prop1(s) { }
    prop2;
}
class Two {
    get prop1() { return "hello"; }
    set prop1(s) { }
    get prop2() { return ""; }
    set prop2(s) { }
}
i.prop1;
i.prop1 = 42;
i.prop1 = "hello";
i.prop2;
i.prop2 = 42;
i.prop2 = "hello";
