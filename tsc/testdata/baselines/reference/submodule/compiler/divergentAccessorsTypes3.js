//// [tests/cases/compiler/divergentAccessorsTypes3.ts] ////

//// [divergentAccessorsTypes3.ts]
class One {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string | number) { }

  prop3: number;

  get prop4(): string { return ""; }
  set prop4(s: string | number) { }
}

class Two {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string) { }

  get prop3(): string { return ""; }
  set prop3(s: string | boolean) { }

  get prop4(): string { return ""; }
  set prop4(s: string | boolean) { }
}

declare const u1: One|Two;

u1.prop1 = 42;
u1.prop1 = "hello";

u1.prop2 = 42;
u1.prop2 = "hello";

u1.prop3 = 42;
u1.prop3 = "hello";
u1.prop3 = true;

u1.prop4 = 42;
u1.prop4 = "hello";
u1.prop4 = true;


//// [divergentAccessorsTypes3.js]
class One {
    get prop1() { return ""; }
    set prop1(s) { }
    get prop2() { return ""; }
    set prop2(s) { }
    prop3;
    get prop4() { return ""; }
    set prop4(s) { }
}
class Two {
    get prop1() { return ""; }
    set prop1(s) { }
    get prop2() { return ""; }
    set prop2(s) { }
    get prop3() { return ""; }
    set prop3(s) { }
    get prop4() { return ""; }
    set prop4(s) { }
}
u1.prop1 = 42;
u1.prop1 = "hello";
u1.prop2 = 42;
u1.prop2 = "hello";
u1.prop3 = 42;
u1.prop3 = "hello";
u1.prop3 = true;
u1.prop4 = 42;
u1.prop4 = "hello";
u1.prop4 = true;
