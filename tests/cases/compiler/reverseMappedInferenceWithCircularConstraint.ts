// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/48798

type AnyFunction = (...args: any[]) => any;

type InferNarrowest<T> = T extends any
  ? T extends AnyFunction
    ? T
    : T extends object
    ? InferNarrowestObject<T>
    : T
  : never;

type InferNarrowestObject<T> = {
  readonly [K in keyof T]: InferNarrowest<T[K]>;
};

type Config<TGlobal, TState = Prop<TGlobal, "states">> = {
  states: {
    [StateKey in keyof TState]: {
      on?: {};
    };
  };
} & {
  initial: keyof TState;
};

type Prop<T, K> = K extends keyof T ? T[K] : never;

const createMachine = <TConfig extends Config<TConfig>>(
  _config: InferNarrowestObject<TConfig>
): void => {};

createMachine({
  initial: "pending",
  states: {
    pending: {
      on: {
        done() {
          return "noData";
        },
      },
    },
  },
});

createMachine({
  initial: "unknown", // error
  states: {
    pending: {
      on: {
        done() {
          return "noData";
        },
      },
    },
  },
});
