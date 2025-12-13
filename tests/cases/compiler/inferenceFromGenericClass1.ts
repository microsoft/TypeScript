// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61633

type AnyConstructor = new (...args: any[]) => object;

class Container<T> {}

declare function RenderFlagsMixin1<
  BaseClass extends AnyConstructor | undefined = undefined,
>(Base?: BaseClass): BaseClass;

const result1 = RenderFlagsMixin1(Container);

declare function RenderFlagsMixin2<
  BaseClass extends AnyConstructor | undefined = undefined,
>(Base: BaseClass): BaseClass;

const result2 = RenderFlagsMixin2(Container);

declare function RenderFlagsMixin3<
  BaseClass extends AnyConstructor | undefined = undefined,
>(Base: BaseClass | number): BaseClass;

const result3 = RenderFlagsMixin3(Container);

declare function RenderFlagsMixin4<
  BaseClass extends AnyConstructor | undefined = undefined,
>(Base?: BaseClass | number): BaseClass;

const result4 = RenderFlagsMixin4(Container);
