package fourslash

import (
	"bufio"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"testing"
)

var failingTests = sync.OnceValue(func() map[string]struct{} {
	failingTestsSet := make(map[string]struct{})

	// Get the path to failingTests.txt relative to this source file
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		return failingTestsSet
	}

	failingTestsPath := filepath.Join(filepath.Dir(thisFile), "_scripts", "failingTests.txt") //nolint:forbidigo

	file, err := os.Open(failingTestsPath) //nolint:forbidigo
	if err != nil {
		return failingTestsSet
	}
	defer file.Close() //nolint:forbidigo

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line != "" {
			failingTestsSet[line] = struct{}{}
		}
	}
	return failingTestsSet
})

// SkipIfFailing checks if the current test is in the failingTests.txt file
// and skips it unless the TSGO_FOURSLASH_IGNORE_FAILING environment variable is set.
// This allows tests to be marked as failing without modifying the test files themselves.
func SkipIfFailing(t *testing.T) {
	t.Helper()

	if os.Getenv("TSGO_FOURSLASH_IGNORE_FAILING") != "" { //nolint:forbidigo
		return
	}

	if _, found := failingTests()[t.Name()]; found {
		t.Skip("Test is in failingTests.txt")
	}
}
