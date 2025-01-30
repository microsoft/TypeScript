// @strict: true
// @noEmit: true

type EventObject = {
  type: string;
};

type FooEvent = { type: "FOO" };
type BarEvent = { type: "BAR" };

type Input = FooEvent | BarEvent;

type ExtractEventSimplified<
  TEvent extends EventObject,
  K extends TEvent["type"],
> = string extends TEvent["type"] ? TEvent : Extract<TEvent, { type: K }>;

type Result = ExtractEventSimplified<NoInfer<Input>, "FOO">;

type EventDescriptorMatches<
  TEventType extends string,
  TNormalizedDescriptor,
> = TEventType extends TNormalizedDescriptor ? true : false;

type PartialEventDescriptor<TEventType extends string> =
  TEventType extends `${infer TLeading}.${infer TTail}`
    ? `${TLeading}.*` | `${TLeading}.${PartialEventDescriptor<TTail>}`
    : never;

type EventDescriptor<TEvent extends EventObject> =
  | TEvent["type"]
  | PartialEventDescriptor<TEvent["type"]>
  | "*";

type NormalizeDescriptor<TDescriptor extends string> = TDescriptor extends "*"
  ? string
  : TDescriptor extends `${infer TLeading}.*`
  ? `${TLeading}.${string}`
  : TDescriptor;

type ExtractEvent<
  TEvent extends EventObject,
  TDescriptor extends EventDescriptor<TEvent>,
> = string extends TEvent["type"]
  ? TEvent
  : NormalizeDescriptor<TDescriptor> extends infer TNormalizedDescriptor
  ? TEvent extends any
    ? // true is the check type here to match both true and boolean
      true extends EventDescriptorMatches<TEvent["type"], TNormalizedDescriptor>
      ? TEvent
      : never
    : never
  : never;

type ActionFunction<
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
> = {
  (args: { event: TExpressionEvent }): void;
  _out_TEvent?: TEvent;
};

type TransitionsConfig<TEvent extends EventObject> = {
  [K in EventDescriptor<TEvent>]?: {
    actions?: ActionFunction<ExtractEvent<TEvent, K>, TEvent>;
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
    events: {} as { type: "FOO" } | { type: "BAR" },
  },
  on: {
    FOO: {
      actions: ({ event }) => {
        event; // { type: "FOO"; }
      },
    },
  },
});

createMachine({
  types: {} as {
    events:
      | { type: "mouse.click.up"; direction: "up" }
      | { type: "mouse.click.down"; direction: "down" }
      | { type: "mouse.move" }
      | { type: "mouse" }
      | { type: "keypress" };
  },
  on: {
    "mouse.*": {
      actions: ({ event }) => {
        event; // { type: "mouse.click.up"; direction: "up" } | { type: "mouse.click.down"; direction: "down" } | { type: "mouse.move" }
      },
    },
  },
});
