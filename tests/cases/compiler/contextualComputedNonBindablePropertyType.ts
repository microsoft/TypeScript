// @noEmit: true
// @strict: true

// repro #51906

declare function testD(): "d";

declare function forceMatch<T>(matched: {
  [key in keyof T]: key;
}): void;

forceMatch({
  [testD()]: "d",
});

declare function forceMatch2<T>(matched: {
  [key in keyof T]: ({ key }: { key: key }) => void;
}): void;

forceMatch2({
  [testD()]: ({ key }) => {},
});

// repro #52954

type Original = { foo: 'expects a string literal', baz: boolean, bar: number }

type Mapped = {
  [prop in keyof Original]: (arg: Original[prop]) => Original[prop]
}

const propSelector =  <propName extends string>(propName: propName): propName => propName;

const unexpectedlyFailingExample: Mapped = {
  foo: (arg) => 'expects a string literal',
  baz: (arg) => true,
  [propSelector('bar')]: (arg) => 51345
}
