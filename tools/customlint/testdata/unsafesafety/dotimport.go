package unsafesafety

import . "unsafe"

func badDotImport(h *header, s string) {
	_ = (*derived)(Pointer(h))
	_ = Slice(StringData(s), len(s))
}

func goodDotImport(h *header) {
	// SAFETY: Dot imports are checked the same way.
	_ = (*derived)(Pointer(h))
	_ = Sizeof(*h)
}
