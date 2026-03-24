package debug_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFailEmptyReason(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.Fail("")
	}, "Debug failure.")
}

func TestFailWithReason(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.Fail("something went wrong")
	}, "Debug failure. something went wrong")
}

type mockNode struct{ kind string }

func (m mockNode) KindString() string { return m.kind }

func TestFailBadSyntaxKindNoMessage(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.FailBadSyntaxKind(mockNode{"FooNode"})
	}, "Debug failure. Unexpected node.\nNode FooNode was unexpected.")
}

func TestFailBadSyntaxKindWithMessage(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.FailBadSyntaxKind(mockNode{"BarNode"}, "custom message")
	}, "Debug failure. custom message\nNode BarNode was unexpected.")
}

func TestAssertNeverDefaultMessageKindString(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.AssertNever(mockNode{"TestNode"})
	}, "Debug failure. Illegal value: TestNode")
}

func TestAssertNeverCustomMessageKindString(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.AssertNever(mockNode{"TestNode"}, "bad value:")
	}, "Debug failure. bad value: TestNode")
}

type mockStringer struct{ s string }

func (m mockStringer) String() string { return m.s }

func TestAssertNeverStringer(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.AssertNever(mockStringer{"hello"})
	}, "Debug failure. Illegal value: hello")
}

func TestAssertNeverFallback(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.AssertNever(42)
	}, "Debug failure. Illegal value: 42")
}

func TestAssertTrue(t *testing.T) {
	t.Parallel()
	debug.Assert(true)
}

func TestAssertTrueWithMessage(t *testing.T) {
	t.Parallel()
	debug.Assert(true, "this should not trigger")
}

func TestAssertFalseNoMessage(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.Assert(false)
	}, "Debug failure. False expression.")
}

func TestAssertFalseWithMessage(t *testing.T) {
	t.Parallel()
	testutil.AssertPanics(t, func() {
		debug.Assert(false, "expected x > 0")
	}, "Debug failure. False expression: expected x > 0")
}
