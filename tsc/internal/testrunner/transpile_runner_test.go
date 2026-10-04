package testrunner

import "testing"

func TestTranspile(t *testing.T) {
	t.Parallel()
	RunTranspileTests(t)
}
