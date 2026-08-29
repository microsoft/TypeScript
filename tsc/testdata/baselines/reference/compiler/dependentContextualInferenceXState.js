//// [tests/cases/compiler/dependentContextualInferenceXState.ts] ////

//// [dependentContextualInferenceXState.ts]
declare const runMachine:
  <TDefinition extends {
    initial: {
      state: keyof TDefinition["transitions"],
      context: object
    },
    transitions: {
      [TState in keyof TDefinition["transitions"]]:
        (current: { context: Context<TDefinition, TState> }) =>
          | void
          | { state: keyof TDefinition["transitions"], context: object }
    }
  }>
    (definition: TDefinition) =>
      { [S in keyof TDefinition["transitions"]]: { state: S, context: Context<TDefinition, S> } }[keyof TDefinition["transitions"]]

// iterative over all transitions and collect the context for the given state
type Context<TDefinition extends Definition, TState> =
  | { [S in keyof TDefinition["transitions"]]:
        ReturnType<TDefinition["transitions"][S]> extends infer R
          ? R extends unknown
              ? R extends { state: TState, context: infer C }
                  ? C
                  : never
              : never
          : never
    }[keyof TDefinition["transitions"]]
  | (TDefinition["initial"]["state"] extends TState
        ? TDefinition["initial"]["context"]
        : never)

// just to satisfy the type checker
type Definition =
  { initial: { state: keyof any, context: object }, transitions: Record<keyof any, (...a: never) => unknown> }

const result = runMachine({
  initial: {
    state: "loggedOut",
    context: {}
  },
  transitions: {
    loggedOut: ({ context }) => {
      return { state: "loggingIn", context: { username: "devanshj", password: "1234" } }
    },
    loggingIn: ({ context }) => {
      if (context.username === "devanshj" && context.password === "1234") {
        return { state: "loggedIn", context: { ...context, accessToken: "whatever" } }
      } else {
        return { state: "loggedOut", context: { failedOnce: true } }
      }
    },
    loggedIn: ({ context }) => {
      console.log(context.accessToken)
    }
  }
})


//// [dependentContextualInferenceXState.js]
"use strict";
const result = runMachine({
    initial: {
        state: "loggedOut",
        context: {}
    },
    transitions: {
        loggedOut: ({ context }) => {
            return { state: "loggingIn", context: { username: "devanshj", password: "1234" } };
        },
        loggingIn: ({ context }) => {
            if (context.username === "devanshj" && context.password === "1234") {
                return { state: "loggedIn", context: { ...context, accessToken: "whatever" } };
            }
            else {
                return { state: "loggedOut", context: { failedOnce: true } };
            }
        },
        loggedIn: ({ context }) => {
            console.log(context.accessToken);
        }
    }
});
