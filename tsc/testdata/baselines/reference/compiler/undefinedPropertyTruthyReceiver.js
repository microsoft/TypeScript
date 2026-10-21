//// [tests/cases/compiler/undefinedPropertyTruthyReceiver.ts] ////

//// [undefinedPropertyTruthyReceiver.ts]
const state = { error: undefined };
const renderedError = state.error ? state.error : "";


//// [undefinedPropertyTruthyReceiver.js]
"use strict";
const state = { error: undefined };
const renderedError = state.error ? state.error : "";
