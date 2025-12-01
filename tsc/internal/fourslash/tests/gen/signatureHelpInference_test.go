package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInference(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f<T extends string>(a: T, b: T, c: T): void;
f("x", /**/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(a: \"x\", b: \"x\", c: \"x\"): void", ParameterCount: 3, ParameterName: "b", ParameterSpan: "b: \"x\""})
}
