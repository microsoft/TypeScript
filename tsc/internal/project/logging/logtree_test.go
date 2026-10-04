package logging

import (
	"testing"
)

// Verify LogTree implements the expected interface
type testLogger interface {
	Log(msg ...any)
}

func TestLogTreeImplementsLogger(t *testing.T) {
	t.Parallel()
	var _ testLogger = &LogTree{}
}

func TestLogTree(t *testing.T) {
	t.Parallel()
}
