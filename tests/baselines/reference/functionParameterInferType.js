//// [functionParameterInferType.ts]
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


//// [functionParameterInferType.js]
function t(input) { }
t({
    fn1: function (input) { return function (data) { }; },
    fn2: function (input) {
        return function (data) { };
    },
    fn3: function (input) {
        return function (data) { };
    },
    fn4: function (input) {
        if (input) {
            return function (data) { };
        }
        else {
            for (;;) {
                return function (data) { };
            }
        }
    }
});
