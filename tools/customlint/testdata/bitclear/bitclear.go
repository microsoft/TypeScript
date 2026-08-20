package bitclear

type Flags uint32

const (
	FlagA Flags = 1 << iota
	FlagB
	FlagC
)

func bad(f Flags) {
	f &= ^FlagA
	f &= ^(FlagA | FlagB)
	f &= ^ /*comment*/ FlagA
	f &= ^ /*comment*/ (FlagA | FlagB)
	_ = f
}

func good(f Flags) {
	f &^= FlagA
	f &^= FlagA | FlagB
	_ = f
}
