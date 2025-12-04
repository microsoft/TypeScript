// @strict: true
// @noEmit: true

declare function setup<TAction = {}>(arg: {
  actions?: {
    [K in keyof TAction]: (
      params: TAction[K],
      exec: (arg: TAction) => void,
    ) => void;
  };
}): TAction;

const result1 = setup({
  actions: {
    first: (params: { count: number }, enqueue) => {},
    second: (params: { foo: string }, enqueue) => {},
  },
});

const result2 = setup({
  actions: {
    foo: (params: { count: number }) => {},
    first: (params: { count: number }, enqueue) => {},
    second: (params: { foo: string }, enqueue) => {},
  },
});

const result3 = setup({
  actions: {
    foo: (params: { count: number }) => {},
    first: (params: { count: number }, enqueue: (arg: never) => void) => {},
    second: (params: { foo: string }, enqueue: (arg: never) => void) => {},
  },
});
