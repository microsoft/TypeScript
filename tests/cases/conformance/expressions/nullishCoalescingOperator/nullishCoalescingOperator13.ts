// @strict: true
// @target: ES2015

// Repro from #44988
type T =
  | { a: string; b: string }
  | { a: string; b?: undefined }
  | { a?: undefined; b: string };

const getResult1 = (value1: string | undefined, value2: T): string => {
  return value1 ?? value2.a ?? value2.b;
};
