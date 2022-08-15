//// [contextualTypeFunctionObjectPropertyIntersection.ts]
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
      ev.type; // should be 'FOO'
    },
  },
});


//// [contextualTypeFunctionObjectPropertyIntersection.js]
"use strict";
createMachine({
    schema: {
        events: {}
    },
    on: {
        FOO: function (ev) {
            ev.type; // should be 'FOO'
        }
    }
});
