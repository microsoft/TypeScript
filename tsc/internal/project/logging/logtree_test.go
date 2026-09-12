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
}

func assertInitializedLogTreeImplementsLogger(tree DefLogTree) {
	var _ testLogger = tree
}

func TestLogTree(t *testing.T) {
	t.Parallel()
}
