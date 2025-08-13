package core

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Tristate -output=tristate_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -lang=go1.25 -w tristate_stringer_generated.go

// Tristate

type Tristate byte

const (
	TSUnknown Tristate = iota
	TSFalse
	TSTrue
)

func (t Tristate) IsTrue() bool {
	return t == TSTrue
}

func (t Tristate) IsTrueOrUnknown() bool {
	return t == TSTrue || t == TSUnknown
}

func (t Tristate) IsFalse() bool {
	return t == TSFalse
}

func (t Tristate) IsFalseOrUnknown() bool {
	return t == TSFalse || t == TSUnknown
}

func (t Tristate) IsUnknown() bool {
	return t == TSUnknown
}

func (t Tristate) DefaultIfUnknown(value Tristate) Tristate {
	if t == TSUnknown {
		return value
	}
	return t
}

func (t *Tristate) UnmarshalJSON(data []byte) error {
	switch string(data) {
	case "true":
		*t = TSTrue
	case "false":
		*t = TSFalse
	default:
		*t = TSUnknown
	}
	return nil
}

func (t Tristate) MarshalJSON() ([]byte, error) {
	switch t {
	case TSTrue:
		return []byte("true"), nil
	case TSFalse:
		return []byte("false"), nil
	default:
		return []byte("null"), nil
	}
}

func BoolToTristate(b bool) Tristate {
	if b {
		return TSTrue
	}
	return TSFalse
}
