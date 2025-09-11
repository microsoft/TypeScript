// @strict: true
// @noEmit: true

type SingleOrArray<T> = T | readonly T[];

type ProvidedActor = {
  src: string;
  input?: unknown;
};

type MachineConfig<TActors extends ProvidedActor> = {
  invoke?: SingleOrArray<TActors>;
};

declare function setup<TActors extends ProvidedActor>(): {
  createMachine: (config: MachineConfig<TActors>) => void;
};

setup<{ src: "fetchUser"; input: string }>().createMachine({
  invoke: {
    src: "fetchUser",
    input: 10,
  },
});
