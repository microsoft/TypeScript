declare const f: (x: Exact<() => { a: { b: string }, c: number }>) => void

f(() => ({
  a: {
    b: "b",
    x: "x"
  },
  c: 0,
  y: 1
}))

type Exact<T, A = self> =
  A extends T
    ? T extends unknown
        ? A extends (...a: infer Aa) => infer Ar
            ? T extends (...a: infer Ea) => infer Er
                ? (...a: Exact<Ea, Aa>) => Exact<Er, Ar>
                : T :
          A extends object
            ? T extends object
                ? { [K in keyof A]:
                      K extends keyof T ? Exact<T[K], A[K]> :
                      Never<`Excess property '${K & string}' not allowed as the target is an exact type`>
                  }
                : T :
          T
        : never
    : T

export {}