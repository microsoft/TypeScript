// @strict: true
// @noEmit: true

interface ActorImpl {
  src: string;
  output: any;
}

interface DoneInvokeEvent<TData> {
  type: `done.invoke.${string}`;
  output: TData;
}

type AssignActionObject<TEvent extends { type: string }> = {
  type: "xstate.assign";
  ev: TEvent;
  (ev: TEvent): void;
};

type ActionFunction<TEvent extends { type: string }> = (ev: TEvent) => void;

declare function assign<TEvent extends { type: string }>(
  assigner: (ev: TEvent) => void
): AssignActionObject<TEvent>;

type Action<TEvent extends { type: string }> =
  | AssignActionObject<TEvent>
  | ActionFunction<TEvent>;

declare function createMachine<TActors extends ActorImpl>(config: {
  types: {
    actors: TActors;
  };
  states: Record<
    string,
    {
      invoke: TActors extends { src: infer TSrc }
        ? {
            src: TSrc;
            onDone: Action<DoneInvokeEvent<TActors["output"]>>;
          }
        : never;
    }
  >;
}): void;

createMachine({
  types: {
    actors: {} as {
      src: "getRandomNumber";
      output: { result: number };
    },
  },
  states: {
    a: {
      invoke: {
        src: "getRandomNumber",
        onDone: assign((event) => {
          event;
          // ^?
        }),
      },
    },
  },
});
