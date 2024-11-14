package core

//go:generate go run golang.org/x/tools/cmd/stringer -type=Tristate -output=tristate_stringer_generated.go

// Tristate

type Tristate byte

const (
	TSUnknown Tristate = iota
	TSFalse
	TSTrue
)

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
