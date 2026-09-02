// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61979

declare function fn<P>(config: {
  callback: (params: P) => (context: number, params: P) => number;
  unrelated?: (arg: string) => void;
}): (params: P) => number;

// should error
export const result1 = fn({
  callback: <T,>(params: T) => {
    return (a: boolean, b) => (a ? 1 : 0);
  },
  unrelated: (_) => {},
});

// should error
export const result2 = fn({
  callback: <T,>(params: T) => {
    return (a, b): boolean => true;
  },
  unrelated: (_) => {},
});

// should error
export const result3 = fn({
  callback: <T,>(params: T) => {
    return (a, b) => true;
  },
  unrelated: (_) => {},
});

declare function fn2<P>(config: {
  callback: (params: P) => (context: number, params: P) => number;
  unrelated?: (arg: string) => void;
}): any;

// should error
export const result4 = fn2({
  callback: <T,>(params: T) => {
    return (a: boolean, b) => (a ? 1 : 0);
  },
  unrelated: (_) => {},
});

// should error
export const result5 = fn({
  callback: <T,>(params: T) => {
    return (a, b): boolean => true;
  },
  unrelated: (_) => {},
});

// should error
export const result6 = fn({
  callback: <T,>(params: T) => {
    return (a, b) => true;
  },
  unrelated: (_) => {},
});
