// @strict: true
// @noemit: true

// https://github.com/microsoft/TypeScript/issues/59473

const a: [any] & [1] = [1];
const b: { ml: any } & { ml: 'edge' } = { ml: 'edge' };

// https://github.com/microsoft/TypeScript/issues/48812

type Action<TEvent extends { type: string }> = (ev: TEvent) => void;

interface MachineConfig<TEvent extends { type: string }> {
  schema: {
    events: TEvent;
  };
  on?: {
    [K in TEvent["type"]]?: Action<TEvent extends { type: K } ? TEvent : never>;
  } & {
    "*"?: Action<TEvent>;
  };
}

declare function createMachine<TEvent extends { type: string }>(
  config: MachineConfig<TEvent>
): void;

createMachine({
  schema: {
    events: {} as { type: "FOO" } | { type: "BAR" },
  },
  on: {
    FOO: (ev) => {
      ev.type;
    },
  },
});

// https://github.com/microsoft/TypeScript/issues/49307#issuecomment-1196014488

type Validate<T> = T & { [K in keyof T]: object }
declare function f<S, T extends Record<string, (state: S) => any>>(s: S, x: Validate<T>): void;

f(0, {
  foo: s => s + 1,
})
