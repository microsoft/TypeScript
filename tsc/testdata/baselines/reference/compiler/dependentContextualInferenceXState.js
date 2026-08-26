//// [tests/cases/compiler/dependentContextualInferenceXState.ts] ////

//// [dependentContextualInferenceXState.ts]
declare const createMachine:
  <T extends
    { initial: keyof T["states"]
    , context: unknown
    , states: 
        { [S in keyof T["states"]]:
            { onNext:
                ( machineInstant:
                    { context:
                      | { [S1 in keyof T["states"]]:
                            ReturnType<T["states"][S1]["onNext"]> extends infer N
                              ? N extends unknown
                                  ? N extends { state: S, context: infer C }
                                      ? C
                                      : never
                                  : never
                              : never
                        }[keyof T["states"]]
                      | ( T["initial"] extends S
                            ? T["context"]
                            : never
                        )
                    }
              ) =>
                | void
                | { state: keyof T["states"]
                  , context: unknown
                  }
            }
        }
    }
  >
    (machine: T) => T

createMachine({
  initial: "loggedOut",
  context: {},
  states: {
    loggedOut: {
      onNext: ({ context }) => {
        const _check: {} | { failed: boolean } = context;
        return { state: "loggingIn", context: { username: "devanshj", password: "1234" } }
      }
    },
    loggingIn: {
      onNext: ({ context }) => {
        const _check: { username: string, password: string } = context;
        if (context.username === "devanshj" && context.password === "1234") {
          return { state: "loggedIn", context: { ...context, accessToken: "whatever" } }
        } else {
          return { state: "loggedOut", context: { failed: true } }
        }
      }
    },
    loggedIn: {
      onNext: ({ context }) => {
        const _check: { username: string, password: string, accessToken: string } = context;
        console.log(context.username)
      }
    }
  }
})


//// [dependentContextualInferenceXState.js]
"use strict";
createMachine({
    initial: "loggedOut",
    context: {},
    states: {
        loggedOut: {
            onNext: ({ context }) => {
                const _check = context;
                return { state: "loggingIn", context: { username: "devanshj", password: "1234" } };
            }
        },
        loggingIn: {
            onNext: ({ context }) => {
                const _check = context;
                if (context.username === "devanshj" && context.password === "1234") {
                    return { state: "loggedIn", context: { ...context, accessToken: "whatever" } };
                }
                else {
                    return { state: "loggedOut", context: { failed: true } };
                }
            }
        },
        loggedIn: {
            onNext: ({ context }) => {
                const _check = context;
                console.log(context.username);
            }
        }
    }
});
