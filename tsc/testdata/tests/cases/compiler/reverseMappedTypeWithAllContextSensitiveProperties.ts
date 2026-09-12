// @strict: true
// @noEmit: true

createMachine({
  initial: "a",
  context: { foo: 1 },
  states: {
    a: {
      entry: (context, state) => {
        context.foo.toFixed();
        const currentState: "a" = state;
      }
    }
  }
})

declare const createMachine:
  <D extends {
    initial: keyof D["states"],
    context: object,
    states: {
      [S in keyof D["states"]]: {
        entry?: (context: D["context"], state: S) => void
      }
    }
  }>
    (definition: IdentityObject<D>) =>
      D

type Identity<T> =
  T extends any
    ? ( T extends (...a: never) => unknown ? T :
        T extends object ? IdentityObject<T> :
        T
      )
    : never

type IdentityObject<T> =
  { [K in keyof T]: Identity<T[K]> }
