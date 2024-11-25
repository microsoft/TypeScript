// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56239

type Values<T> = T[keyof T];

type ProvidedActor = {
  src: string;
  logic: unknown;
};

interface StateMachineConfig<TActors extends ProvidedActor> {
  invoke: {
    src: TActors["src"];
  };
}

declare function setup<TActors extends Record<string, unknown>>(_: {
  actors: {
    [K in keyof TActors]: TActors[K];
  };
}): {
  createMachine: (
    config: StateMachineConfig<
      Values<{
        [K in keyof TActors as K & string]: {
          src: K;
          logic: TActors[K];
        };
      }>
    >,
  ) => void;
};
