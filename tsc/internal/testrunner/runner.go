package testrunner

import "testing"

type Runner interface {
	EnumerateTestFiles() []string
	RunTests(t *testing.T)
}

func runTests(t *testing.T, runners []Runner) {
	for _, runner := range runners {
		runner.RunTests(t)
	}
}
