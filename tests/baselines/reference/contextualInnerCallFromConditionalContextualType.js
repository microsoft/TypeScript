//// [contextualInnerCallFromConditionalContextualType.ts]
interface EventObject { type: string; }
interface TypegenDisabled { "@@xstate/typegen": false; }
interface TypegenEnabled { "@@xstate/typegen": true; }

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
  action?: TTypesMeta extends TypegenEnabled
    ? { action: ActionObject<{ type: "WITH_TYPEGEN" }> }
    : { action: ActionObject<{ type: "WITHOUT_TYPEGEN" }> }
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



//// [contextualInnerCallFromConditionalContextualType.js]
"use strict";
createMachine({
    types: {}
}, {
    action: assign(function (event) {
        event.type; // should be 'WITH_TYPEGEN'
    })
});
