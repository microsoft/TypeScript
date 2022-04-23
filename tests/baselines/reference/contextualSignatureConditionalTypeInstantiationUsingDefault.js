//// [contextualSignatureConditionalTypeInstantiationUsingDefault.ts]
export interface TypegenDisabled {
  "@@xstate/typegen": false;
}
export interface TypegenEnabled {
  "@@xstate/typegen": true;
}

type ActionFunction<TEvent extends { type: string }> = (event: TEvent) => void;

declare function createMachine<
  TTypesMeta extends TypegenEnabled | TypegenDisabled = TypegenDisabled
>(
  config: {
    types?: TTypesMeta;
  },
  implementations: TTypesMeta extends TypegenEnabled
    ? ActionFunction<{ type: "test" }>
    : ActionFunction<{ type: string }>
): void;

createMachine({}, (ev) => {
  ev.type; // should be `string`
});


//// [contextualSignatureConditionalTypeInstantiationUsingDefault.js]
"use strict";
exports.__esModule = true;
createMachine({}, function (ev) {
    ev.type; // should be `string`
});
