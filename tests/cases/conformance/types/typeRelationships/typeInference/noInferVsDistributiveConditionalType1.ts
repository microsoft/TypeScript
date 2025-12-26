// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61076

type FooEvent = { type: "FOO" };
type BarEvent = { type: "BAR" };

type Input = FooEvent | BarEvent;
type Result = Extract<NoInfer<Input>, FooEvent>;

type EventObject = {
  type: string;
};

type ActionFunction<
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
> = {
  (args: { event: TExpressionEvent }): void;
  _out_TEvent?: TEvent;
};

type TransitionsConfig<TEvent extends EventObject> = {
  [K in TEvent["type"]]?: {
    actions?: ActionFunction<Extract<TEvent, { type: K }>, TEvent>;
  };
};

declare function createMachine<TEvent extends EventObject>(config: {
  types?: {
    events?: TEvent;
  };
  on?: TransitionsConfig<NoInfer<TEvent>>;
}): void;

createMachine({
  types: {
    events: {} as Input,
  },
  on: {
    FOO: {
      actions: ({ event }) => {
        event; // { type: "FOO"; }
      },
    },
  },
});
