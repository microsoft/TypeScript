package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpRestArgs1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function fn(a: number, b: number, c: number) {}
const a = [1, 2] as const;
const b = [1] as const;

fn(...a, /*1*/);
fn(/*2*/, ...a);

fn(...b, /*3*/);
fn(/*4*/, ...b, /*5*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineSignatureHelp(t)
}
