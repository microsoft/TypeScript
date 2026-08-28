//// [tests/cases/compiler/dependentContextualInferenceXState.ts] ////

//// [dependentContextualInferenceXState.ts]
declare const runMachine:
  <T extends
    { initial:
        { state: keyof T["transitions"]
        , context: object
        }
    , transitions: 
        { [S in keyof T["transitions"]]:
            ( current:
                  { context:
                    | { [S1 in keyof T["transitions"]]:
                          ReturnType<T["transitions"][S1]> extends infer N
                            ? N extends unknown
                                ? N extends { state: S, context: infer C }
                                    ? C
                                    : never
                                : never
                            : never
                      }[keyof T["transitions"]]
                    | ( T["initial"]["state"] extends S
                          ? T["initial"]["context"]
                          : never
                      )
                  }
            ) =>
              | void
              | { state: keyof T["transitions"]
                , context: object
                }
        }
    },
    S = keyof T["transitions"]
  >
    (machine: T) =>
      S extends unknown
        ? { state: S
          , context: 
            | { [S1 in keyof T["transitions"]]:
                  ReturnType<T["transitions"][S1]> extends infer N
                    ? N extends unknown
                        ? N extends { state: S, context: infer C }
                            ? C
                            : never
                        : never
                    : never
              }[keyof T["transitions"]]
            | ( T["initial"]["state"] extends S
                  ? T["initial"]["context"]
                  : never
              )
          }
        : never

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
