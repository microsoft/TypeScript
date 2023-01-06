declare const f: (x: Exact<() => { a: { b: string }, c: number }>) => void

f(() => ({
  a: {
    b: "b",
    x: "x"
  },
  c: 0,
  y: 1
}))

type Exact<T> =
  _Exact<T, self>

// TODO: doesn't work if written as,,,
// type Exact<T, A = self> = ...

type _Exact<T, A> =
  A extends T
    ? T extends unknown
        ? A extends (...a: infer Aa) => infer Ar
            ? T extends (...a: infer Ea) => infer Er
                ? (...a: _Exact<Ea, Aa>) => _Exact<Er, Ar>
                : T :
          A extends object
            ? T extends object
                ? { [K in keyof A]:
                      K extends keyof T ? _Exact<T[K], A[K]> :
                      Never<`Excess property '${K & string}' not allowed as the target is an exact type`>
                  }
                : T :
          T
        : never
    : T

export {}