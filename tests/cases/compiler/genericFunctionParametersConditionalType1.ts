// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62079

export {};

interface _Map {
  foo: { a: 123 }
}

type ModuleSubType = "bar" & { brand: true };

type Map = _Map & Record<ModuleSubType, { blah: string }>

type SubTypeGet<
  SubType extends string,
  Map extends Record<SubType, unknown>,
> = SubType extends unknown
? { type?: SubType } & Map[SubType]
: never;

type TestParameters = Parameters<<T extends "foo" | ModuleSubType>(arg: SubTypeGet<T, Map>) => void>

declare class Test<T extends "foo" | ModuleSubType> {
  constructor(arg: SubTypeGet<T, Map>);
}

type TestConstructorParameters = ConstructorParameters<typeof Test>;

declare class Animal { eat(): void; }
declare class Cat extends Animal { meow(): void; }
declare class Dog extends Animal { bark(): void; }

type WithDistributiveConditionalDirectlyInParam = <T extends Cat | Dog>(
  arg: T extends unknown ? T : never,
) => void;

type Result1 = Parameters<WithDistributiveConditionalDirectlyInParam>;

type WithDistributiveConditionalNested = <T extends Cat | Dog>(
  arg: T extends unknown ? { animal: T } : never,
) => void;

type Result2 = Parameters<WithDistributiveConditionalNested>;

type WithNonDistributiveConditionalNested = <T extends Cat | Dog>(
  arg: [T] extends [unknown] ? { animal: T } : never,
) => void;

type Result3 = Parameters<WithNonDistributiveConditionalNested>;
