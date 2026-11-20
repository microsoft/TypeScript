// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Signature help for the inner call resolves the outer call from within
// it, while the inner call is being resolved. The errors of that
// resolution are not reported once the call is checked (48135).

interface Monad<A> { Array: A[] }
type MonadIdentifier = keyof Monad<unknown>

declare const setBindArray:
  (bind: <A, B>(g: (a: A) => Monad<B>["Array"]) => (fa: Monad<A>["Array"]) => Monad<B>["Array"]) => void

setBindArray(g => fa => fa.flatMap(g))

declare const setBindGeneric:
  <I extends MonadIdentifier>
    ( idenfier: I
    , bind: <A, B>(g: (a: A) => Monad<B>[I]) => (fa: Monad<A>[I]) => Monad<B>[I]
    ) => void

setBindGeneric("Array", g => fa => fa.flatMap(g))
