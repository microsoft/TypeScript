// @strict: true
// @target: esnext
// @declaration: true

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
  