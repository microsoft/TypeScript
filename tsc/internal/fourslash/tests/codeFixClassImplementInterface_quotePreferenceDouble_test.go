package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterface_quotePreferenceDouble(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    a(): void;
    b(x: "x", y: "a" | "b"): "b";

    c: "c";
    d: { e: "e"; };
}
class Foo implements I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `interface I {
    a(): void;
    b(x: "x", y: "a" | "b"): "b";

    c: "c";
    d: { e: "e"; };
}
class Foo implements I {
    a(): void {
        throw new Error("Method not implemented.");
    }
    b(x: "x", y: "a" | "b"): "b" {
        throw new Error("Method not implemented.");
    }
    c: "c";
    d: { e: "e"; };
}`,
		Index:           0,
		UserPreferences: &lsutil.UserPreferences{QuotePreference: lsutil.QuotePreference("double")},
	})
}
