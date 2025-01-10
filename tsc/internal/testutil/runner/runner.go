package runner

import "testing"

type Runner interface {
	EnumerateTestFiles() []string
	RunTests(t *testing.T)
}

func runTests(t *testing.T, runners []Runner) {
	// !!!
	// const seen = new Map<string, string>();
	// const dupes: [string, string][] = [];
	for _, runner := range runners {
		runner.RunTests(t)
	}
}
