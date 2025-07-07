// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

type Values<T> = T[keyof T];

type EventObject = {
  type: string;
};

interface ActorLogic<TEvent extends EventObject> {
  transition: (ev: TEvent) => unknown;
}

type UnknownActorLogic = ActorLogic<never>;

interface ProvidedActor {
  src: string;
  logic: UnknownActorLogic;
}

interface ActionFunction<TActor extends ProvidedActor> {
  (): void;
  _out_TActor?: TActor;
}

interface AssignAction<TActor extends ProvidedActor> {
  (): void;
  _out_TActor?: TActor;
}

interface MachineConfig<TActor extends ProvidedActor> {
  entry?: ActionFunction<TActor>;
}

declare function assign<TActor extends ProvidedActor>(
  _: (spawn: (actor: TActor["src"]) => void) => {},
): AssignAction<TActor>;

type ToProvidedActor<TActors extends Record<string, UnknownActorLogic>> =
  Values<{
    [K in keyof TActors & string]: {
      src: K;
      logic: TActors[K];
    };
  }>;

declare function setup<
  TActors extends Record<string, UnknownActorLogic> = {},
>(implementations?: {
  actors?: { [K in keyof TActors]: TActors[K] };
}): {
  createMachine: <
    const TConfig extends MachineConfig<ToProvidedActor<TActors>>,
  >(
    config: TConfig,
  ) => void;
};

declare const counterLogic: ActorLogic<{ type: "INCREMENT" }>;

// example usage
setup({
  actors: { counter: counterLogic },
}).createMachine({
  entry: assign((spawn) => {
    spawn("counter"); // ok
    spawn("alarm"); // error
    return {};
  }),
});

// no provided actors, `assign` should still work
setup().createMachine({
  entry: assign(() => ({})),
});
