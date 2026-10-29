package unsafesafety

import "unsafe"

type header struct {
	kind int
}

type derived struct {
	header
	value int
}

func bad(h *header, b []byte, s string) {
	_ = (*derived)(unsafe.Pointer(h))
	_ = unsafe.String(&b[0], len(b))
	_ = unsafe.Slice(unsafe.StringData(s), len(s))
	_ = unsafe.SliceData(b)
	_ = unsafe.Add(unsafe.Pointer(h), 1)

	// Not a safety comment.
	_ = (*derived)(unsafe.Pointer(h))

	// SAFETY: Separated from the use by a blank line.

	_ = (*derived)(unsafe.Pointer(h))

	// safety: Wrong case.
	_ = (*derived)(unsafe.Pointer(h))

	if h.kind == 1 {
		_ = (*derived)(unsafe.Pointer(h))
	}

	_ = unsafe.Pointer(h) // SAFETY: Trailing comments only cover their own line.
	_ = unsafe.Pointer(h)
}

type ptrAlias = unsafe.Pointer

type ptrNamed unsafe.Pointer

func badConversions(p unsafe.Pointer, a ptrAlias, n ptrNamed, h *header) {
	_ = (*int)(p)
	_ = uintptr(p)
	_ = (*int)(a)
	_ = (*int)(n)
	_ = ptrAlias(h)
	_ = ptrNamed(h)
}

// SAFETY: Comments on a function do not cover its body.
func badFuncComment(h *header) *derived {
	return (*derived)(unsafe.Pointer(h))
}

func good(h *header, b []byte, p unsafe.Pointer) {
	// SAFETY: h is always embedded in a derived.
	_ = (*derived)(unsafe.Pointer(h))

	_ = (*derived)(unsafe.Pointer(h)) // SAFETY: Trailing comment.

	/* SAFETY: Block comment. */
	_ = (*derived)(unsafe.Pointer(h))

	// Multiple lines of explanation are fine,
	// SAFETY: as long as one starts with SAFETY.
	// More text.
	_ = (*derived)(unsafe.Pointer(h))

	// SAFETY: One comment covers the whole statement.
	_ = unsafe.Slice((*byte)(unsafe.Pointer(h)), unsafe.Sizeof(*h))

	// SAFETY: Covers the if statement, including its init.
	if p := (*derived)(unsafe.Pointer(h)); p != nil {
		_ = p
	}

	use(
		1,
		// SAFETY: Comment directly above an argument.
		unsafe.Pointer(h),
	)

	switch h.kind {
	case 1:
		// SAFETY: Inside a case clause.
		_ = (*derived)(unsafe.Pointer(h))
	}

	// SAFETY: Conversions from unsafe.Pointer need justification too.
	_ = (*derived)(p)

	// Compile-time operations are always safe.
	_ = unsafe.Sizeof(*h)
	_ = unsafe.Alignof(*h)
	_ = unsafe.Offsetof(derived{}.value)
}

// Using unsafe.Pointer as a type is not itself unsafe.
func use(_ int, p unsafe.Pointer) unsafe.Pointer {
	return p
}

// SAFETY: Package-level declarations are covered too.
var global = unsafe.Pointer(&derived{})

var badGlobal = unsafe.Pointer(&derived{})
