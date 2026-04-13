package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests namespace expansion where members reference private/internal types
// that aren't directly exported from the namespace.
func TestQuickinfoVerbosityNamespacePrivateTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare namespace API/*1*/ {
    interface InternalConfig {
        secret: string;
        timeout: number;
    }
    function configure(config: InternalConfig): void;
    const defaultConfig: InternalConfig;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
