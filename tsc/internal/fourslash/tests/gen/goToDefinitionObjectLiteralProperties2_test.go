package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionObjectLiteralProperties2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type C = {
  foo: string;
  bar: number;
};

declare function fn<T extends C>(arg: T): T;

fn({
  foo/*1*/: "",
  bar/*2*/: true,
});

const result = fn({
  foo/*3*/: "",
  bar/*4*/: 1,
});

// this one shouldn't go to the constraint type
result.foo/*5*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "1", "2", "3", "4", "5")
}
