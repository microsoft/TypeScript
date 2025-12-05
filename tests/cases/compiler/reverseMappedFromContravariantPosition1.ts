// @strict: true
// @noEmit: true

declare function test1<T>(
  cb: (arg: { [K in keyof T]: { prop: T[K] } }) => void,
): T;

type Arg = {
  a: {
    prop: number;
  };
  b: {
    prop: boolean;
  };
};

const result1 = test1((arg: Arg) => {});
