// ignore `Generic` so it can't be used inside the expression for `Monad`.
// ensure `TypeParameter` is called, or provided to another thing that needs it.
// Fail when the type for self is recursive.
type First<Second<Third>> = Second<string>;