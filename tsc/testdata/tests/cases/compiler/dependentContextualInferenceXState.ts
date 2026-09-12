declare const runMachine:
  <TDefinition extends {
    initial: {
      state: keyof TDefinition["transitions"],
      context: object
    },
    transitions: {
      [TState in keyof TDefinition["transitions"]]:
        (current: { context: MapNeverToAny<Context<TDefinition, TState>> }) =>
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
                  ? IsAny<C> extends true ? never : C
                    // if it's any it usually means the transition hasn't got it's parameter types yet so we ignore it
                    // this is needed to make the `cyclicResult` case work
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

type MapNeverToAny<T> =
  [T] extends [never] ? any : T

type IsAny<T> =
  0 extends (1 & T) ? true : false

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

const cyclicResult = runMachine({
  initial: {
    state: "a",
    context: {}
  },
  transitions: {
    a: ({ context }) => {
      return { state: "b", context: { ...context, a: ""} }
    },
    b: ({ context }) => {
      return { state: "a", context:  { ...context, b: "" } }
    }
  }
})
