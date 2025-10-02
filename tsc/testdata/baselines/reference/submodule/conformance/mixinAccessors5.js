//// [tests/cases/conformance/classes/mixinAccessors5.ts] ////

//// [mixinAccessors5.ts]
// https://github.com/microsoft/TypeScript/issues/61967

declare function basicMixin<T extends object, U extends object>(
  t: T,
  u: U,
): T & U;
  
declare class GetterA {
  constructor(...args: any[]);

  get inCompendium(): boolean;
}
  
declare class GetterB {
  constructor(...args: any[]);

  get inCompendium(): boolean;
}
  
declare class TestB extends basicMixin(GetterA, GetterB) {
  override get inCompendium(): boolean;
}
  

//// [mixinAccessors5.js]


//// [mixinAccessors5.d.ts]
declare function basicMixin<T extends object, U extends object>(t: T, u: U): T & U;
declare class GetterA {
    constructor(...args: any[]);
    get inCompendium(): boolean;
}
declare class GetterB {
    constructor(...args: any[]);
    get inCompendium(): boolean;
}
declare const TestB_base: typeof GetterA & typeof GetterB;
declare class TestB extends TestB_base {
    get inCompendium(): boolean;
}
