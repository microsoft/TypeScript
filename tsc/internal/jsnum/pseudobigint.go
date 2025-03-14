package jsnum

// PseudoBigInt represents a JS-like bigint.
type PseudoBigInt struct {
	Negative    bool
	Base10Value string
}

func (value PseudoBigInt) String() string {
	if len(value.Base10Value) == 0 || value.Base10Value == "0" {
		return "0"
	}
	if value.Negative {
		return "-" + value.Base10Value
	}
	return value.Base10Value
}

func (value PseudoBigInt) Sign() int {
	if len(value.Base10Value) == 0 || value.Base10Value == "0" {
		return 0
	}
	if value.Negative {
		return -1
	}
	return 1
}
