package record

import "unsafe"

type Kind uint8

const (
	KindUnknown Kind = iota
	KindSmall
	KindLarge
)

type Header struct {
	Kind  Kind `customlint:"protected"`
	Flags uint32
}

type Small struct {
	Header
	value int
}

type Large struct {
	Header
	values [4]int
}

type Alias = Header

type Defined Header

var _ [0 - unsafe.Offsetof(Large{}.Header)]byte

var _ = unsafe.Sizeof(Header{})

func NewSmall(value int) *Header {
	s := &Small{value: value}
	s.Kind = KindSmall //nolint:customlint
	return &s.Header
}

func (h *Header) AsLarge() *Large {
	if h.Kind != KindLarge {
		panic("bad cast")
	}
	return (*Large)(unsafe.Pointer(h))
}

func (h Header) ByValue() Kind {
	return h.Kind
}

var zero Header
