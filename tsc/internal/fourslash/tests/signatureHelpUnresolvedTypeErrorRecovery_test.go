package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Building a call's signature label reuses the callee's declared parameter type node. A
// grammar-recovered, incomplete property (`a?: U =`) alongside a well-formed property that
// references an unresolved type (`b?: (p: U) => void`) routes serialization through the
// node-reuse path. Resolving the reference on a copied node whose parent is unset must not
// panic (nil pointer dereference during type-node serialization).
func TestSignatureHelpUnresolvedTypeInErrorRecoveredSignature(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(x: {
    a?: U =
    b?: (p: U) => void
}) {}
f(/*a*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
