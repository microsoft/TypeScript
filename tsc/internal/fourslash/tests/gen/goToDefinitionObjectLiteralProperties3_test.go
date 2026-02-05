package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionObjectLiteralProperties3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type A = {
  foo: unknown;
};

type B = {
  foo?: unknown;
  bar: unknown;
};

function test1(arg: A | B) {}

test1({
  foo/*1*/: 1,
});

function test2<T extends A>(arg: T | B) {}

test2({
  foo/*2*/: 2,
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "1", "2")
}
