//// [tests/cases/conformance/override/overrideLateBindableName1.ts] ////

//// [overrideLateBindableName1.ts]
const prop = "foo"

class Base1 {
  [prop]() {}
}

class Derived1 extends Base1 {
  override [prop]() {}
}

class Base2 {
  [prop]() {}
}

class Derived2 extends Base2 {
  [prop]() {}
}

class Base3 {}

class Derived3 extends Base3 {
  override [prop]() {}
}




//// [overrideLateBindableName1.d.ts]
declare const prop = "foo";
declare class Base1 {
    [prop](): void;
}
declare class Derived1 extends Base1 {
    [prop](): void;
}
declare class Base2 {
    [prop](): void;
}
declare class Derived2 extends Base2 {
    [prop](): void;
}
declare class Base3 {
}
declare class Derived3 extends Base3 {
    [prop](): void;
}
