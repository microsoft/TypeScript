// @strict: true
// @noEmit: true

type ContextStates =
  | {
      status: "loading";
      data: null;
    }
  | {
      status: "success";
      data: string;
    };

declare function createStore<TContext>(config: {
  context: TContext;
  on: Record<string, (ctx: TContext) => TContext>;
}): void;

const store = createStore({
  context: {
    status: "loading",
    data: null,
  } as ContextStates,
  on: {
    fetch: (ctx) => ({
      status: "success",
      data: "hello",
    }),
  },
});
