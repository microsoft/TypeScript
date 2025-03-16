package testutil

import (
	"os"
	"runtime/debug"
	"strconv"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/race"
	"gotest.tools/v3/assert"
)

func AssertPanics(tb testing.TB, fn func(), expected any, msgAndArgs ...any) {
	tb.Helper()

	var got any

	func() {
		defer func() {
			got = recover()
		}()
		fn()
	}()

	assert.Assert(tb, got != nil, msgAndArgs...)
	assert.Equal(tb, got, expected, msgAndArgs...)
}

func RecoverAndFail(t *testing.T, msg string) {
	if r := recover(); r != nil {
		stack := debug.Stack()
		t.Fatalf("%s:\n%v\n%s", msg, r, string(stack))
	}
}

var testProgramIsSingleThreaded = sync.OnceValue(func() bool {
	// Leave Program in SingleThreaded mode unless explicitly configured or in race mode.
	if v := os.Getenv("TS_TEST_PROGRAM_SINGLE_THREADED"); v != "" {
		if b, err := strconv.ParseBool(v); err == nil {
			return b
		}
	}
	return !race.Enabled
})

func TestProgramIsSingleThreaded() bool {
	return testProgramIsSingleThreaded()
}
