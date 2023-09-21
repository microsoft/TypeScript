type XNumber_ = { x: number }

declare function foo_<T extends XNumber_>(props: {[K in keyof T & keyof XNumber_]: T[K]}): T;

foo_({x: 1, y: 'foo'});

// -----------------------------------------------------------------------------------------

const checkType_ = <T>() => <U extends T>(value: { [K in keyof U & keyof T]: U[K] }) => value;

const checked_ = checkType_<{x: number, y: string}>()({
  x: 1 as number,
  y: "y",
  z: "z",
});