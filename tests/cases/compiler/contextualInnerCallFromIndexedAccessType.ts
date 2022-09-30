// @strict: true
// @noEmit: true

interface EventObject { type: string; }
interface TypegenDisabled { "@@xstate/typegen": 0; }
interface TypegenEnabled { "@@xstate/typegen": 1; }

type TypegenConstraint = TypegenEnabled | TypegenDisabled;

interface ActionObject<TEvent extends EventObject> {
  type: string;
  _TE?: TEvent;
}

declare function assign<TEvent extends EventObject>(
  assignment: (ev: TEvent) => void
): ActionObject<TEvent>;

declare function createMachine<
  TTypesMeta extends TypegenConstraint = TypegenDisabled
>(
  config: {
    types?: TTypesMeta;
  },
  action?: {
    1: { action: ActionObject<{ type: "WITH_TYPEGEN" }> };
    0: { action: ActionObject<{ type: "WITHOUT_TYPEGEN" }> };
  }[TTypesMeta["@@xstate/typegen"]]
): void;

createMachine(
  {
    types: {} as TypegenEnabled,
  },
  {
    action: assign((event) => {
      event.type // should be 'WITH_TYPEGEN'
    }),
  }
);

