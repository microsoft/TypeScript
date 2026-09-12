package typeutil

type (
	DefPtr[T any]               = *T      // ref: nonnil
	DefSlice[T any]             = []T     // ref: nonnil
	DefMap[K comparable, V any] = map[K]V // ref: nonnil
	Never                       = any     // ref: never
	DefAny                      = any     // ref: nonnil
	DefError                    = error   // ref: nonnil
	UnusedAny                   = any     // Import and use this type whenever you would use one of these types only in a refinement annoation.
)

// Asserts `x` is non-nil. Equivalent to `x!` in TS.
func NonNil[T any](x *T) DefPtr[T] {
	return x //ref:ignore
}
