package consumer

import "testdata/protectedfield/record"

type Container struct {
	header *record.Header
	small  record.Small
}

func writes(h *record.Header, s *record.Small, d *record.Defined) {
	h.Kind = record.KindLarge
	s.Kind = record.KindLarge
	s.Header.Kind++
	d.Kind = record.KindLarge
	h.Kind, h.Flags = record.KindLarge, 1
	_ = &h.Kind
	h.Flags = 1
	_ = &h.Flags
	_ = h.Kind
	for _, h.Kind = range []record.Kind{record.KindLarge} {
	}
	for h.Kind = range record.Kind(2) {
	}
	var kinds []record.Kind
	for _, kind := range kinds {
		_ = kind
	}
}

func literals() {
	_ = &record.Header{Kind: record.KindLarge}
	_ = &record.Header{record.KindLarge, 1}
	_ = &record.Header{Flags: 1}
	_ = &record.Small{}
	_ = &record.Alias{Kind: record.KindSmall}
	_ = []*record.Header{{Kind: record.KindLarge}}
	_ = []*record.Header{{record.KindLarge, 1}}
	_ = map[int]*record.Header{0: {Kind: record.KindLarge}}
	_ = []*record.Header{{Flags: 1}}
}

func copies(h *record.Header, s *record.Small, hs []record.Header) {
	*h = *record.NewSmall(1)
	small := *s
	var local record.Header
	_ = record.Small{}
	_ = hs[0]
	_ = &hs[0]
	_ = hs[0].Flags
	_ = (*h).Flags
	_ = &(*h)
	_ = s.Header
	_ = &s.Header
	for _, v := range hs {
		_ = v
	}
	_, _ = small, local
	_ = h.AsLarge()
}

func param(h record.Header) {}

func result() (h *record.Header) { return nil }

func valueResult() record.Small { return record.Small{} }
