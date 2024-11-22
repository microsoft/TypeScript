package testutil

import (
	"testing"

	"gotest.tools/v3/assert"
)

func AssertPanics(tb testing.TB, fn func(), expected any, msgAndArgs ...interface{}) {
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
