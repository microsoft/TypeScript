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
