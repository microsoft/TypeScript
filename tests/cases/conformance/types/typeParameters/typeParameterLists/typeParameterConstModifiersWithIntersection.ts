// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55778

interface Config<T1 extends { type: string }> {
  useIt: T1;
}

declare function test<
  T1 extends { type: string },
  const TConfig extends Config<T1>,
>(config: { produceThing: T1 } & TConfig): TConfig;

const result = test({
  produceThing: {} as {
    type: "foo";
  },
  useIt: {
    type: "foo",
  },
  extra: 10,
});