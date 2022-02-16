function t<
  O extends { [key: string]: (...args: any[]) => (arg: number) => void }
>(input: O) {}

t({
  fn1: (input: string) => (data) => {},
  fn2: (input: string) => {
    return (data) => {};
  },
  fn3(input: string) {
    return (data) => {};
  },
  fn4: (input: string) => {
    if (input) {
      return (data: number) => {};
    } else {
      for (;;) {
        return (data) => {};
      }
    }
  },
});
