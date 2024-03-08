// @jsx: preserve
// @noImplicitAny: true

// @filename: index.tsx
interface Elements {
  foo: { callback?: (value: number) => void };
  bar: { callback?: (value: string) => void };
}

type Props<C extends keyof Elements> = { as?: C } & Elements[C];
declare function Test<C extends keyof Elements>(props: Props<C>): null;

<Test
  as="bar"
  callback={(value) => {}}
/>;

Test({
  as: "bar",
  callback: (value) => {},
});

<Test<'bar'>
  as="bar"
  callback={(value) => {}}
/>;
