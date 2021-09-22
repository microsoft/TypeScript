// @strict: true

export interface TypegenDisabled {
  "@@xstate/typegen": false;
}
export interface TypegenEnabled {
  "@@xstate/typegen": true;
}
interface TypegenMeta extends TypegenEnabled {
  eventsCausingActions: Record<string, string>;
}

type Prop<T, K> = K extends keyof T ? T[K] : never

type TypegenConstraint = TypegenMeta | TypegenDisabled;

interface EventObject {
  type: string;
}

interface MachineConfig<TTypesMeta = TypegenDisabled> {
  types?: TTypesMeta;
}

type ActionFunction<
  TEvent extends EventObject,
> = (
  event: TEvent,
) => void;

interface MachineOptions {
  actions?: Record<string, ActionFunction<EventObject>>
}

type TypegenMachineOptionsActions<
  TEvent extends EventObject,
  TTypesMeta,
  TEventsCausingActions = Prop<TTypesMeta, "eventsCausingActions">
> = {
  [K in keyof TEventsCausingActions]?: ActionFunction<
    Extract<TEvent, { type: TEventsCausingActions[K] } >
  >;
};

type GenerateActionsConfigPart<
  TEvent extends EventObject,
  TTypesMeta,
> = {
  actions?: TypegenMachineOptionsActions<TEvent, TTypesMeta>;
};

type MaybeTypegenMachineOptions<
  TEvent extends EventObject,
  TTypesMeta = TypegenDisabled
> = TTypesMeta extends TypegenEnabled
  ? GenerateActionsConfigPart<TEvent, TTypesMeta>
  : MachineOptions;

interface Model<TEvent extends EventObject> {
  createMachine: {
    <TTypesMeta extends TypegenConstraint = TypegenDisabled>(
      config: MachineConfig<TTypesMeta>,
      implementations?: MaybeTypegenMachineOptions<
        TEvent,
        TTypesMeta
      >
    ): void;
  };
}

const model = {} as Model<
  {
    type: "SAMPLE";
  }
>;

model.createMachine(
  {},
  {
    actions: {
      custom: (ev) => {
        ev.type // string
        ev.unknown // Error
      },
    },
  }
);
