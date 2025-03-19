//// [tests/cases/compiler/divergentAccessorsTypes5.ts] ////

//// [divergentAccessorsTypes5.ts]
// Not really different from divergentAccessorsTypes4.ts,
// but goes through the deferred type code

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

class Three {
  get prop1(): "hello" { return "hello"; }
  set prop1(s: "hello" | boolean) { }

  get prop2(): string { return ""; }
  set prop2(s: string | number | boolean) { }
}

declare const i: One & Two & Three;

// "hello"
i.prop1 = 42; // error
i.prop1 = "hello";

// 42
i.prop2 = 42;
i.prop2 = "hello"; // error


//// [divergentAccessorsTypes5.js]
// Not really different from divergentAccessorsTypes4.ts,
// but goes through the deferred type code
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
class Three {
    get prop1() { return "hello"; }
    set prop1(s) { }
    get prop2() { return ""; }
    set prop2(s) { }
}
// "hello"
i.prop1 = 42; // error
i.prop1 = "hello";
// 42
i.prop2 = 42;
i.prop2 = "hello"; // error
