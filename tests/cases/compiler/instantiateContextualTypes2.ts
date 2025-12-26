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

declare function createStore<TContext>(
  context: TContext,
  config: {
    on: Record<string, (ctx: TContext) => TContext>;
  },
): void;

const store1 = createStore(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: (ctx) => ({
        status: "success",
        data: "hello",
      }),
    },
  },
);

const store2 = createStore(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: () => ({
        status: "success",
        data: "hello",
      }),
    },
  },
);

const store3 = createStore(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: (ctx) => {
        return {
          status: "success",
          data: "hello",
        };
      },
    },
  },
);

const store4 = createStore(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: () => {
        return {
          status: "success",
          data: "hello",
        };
      },
    },
  },
);

declare function createStore2<TContext>(
  context: TContext,
  config: {
    on: Record<string, (ctx: TContext) => { context: TContext }>;
  },
): void;

const store5 = createStore2(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: (ctx) => ({
        context: {
          status: "success",
          data: "hello",
        },
      }),
    },
  },
);

const store6 = createStore2(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: () => ({
        context: {
          status: "success",
          data: "hello",
        },
      }),
    },
  },
);

const store7 = createStore2(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: (ctx) => {
        return {
          context: {
            status: "success",
            data: "hello",
          },
        };
      },
    },
  },
);

const store8 = createStore2(
  {
    status: "loading",
    data: null,
  } as ContextStates,
  {
    on: {
      fetch: () => {
        return {
          context: {
            status: "success",
            data: "hello",
          },
        };
      },
    },
  },
);
