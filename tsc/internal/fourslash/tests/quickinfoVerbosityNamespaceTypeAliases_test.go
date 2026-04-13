package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests namespace expansion with type aliases whose RHS is a complex mapped/conditional type.
func TestQuickinfoVerbosityNamespaceTypeAliases(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
type BaseConfig = { host: string; port: number };

declare namespace Config/*1*/ {
    type Readonly<T> = { readonly [K in keyof T]: T[K] };
    type Optional<T> = { [K in keyof T]?: T[K] };
    type ServerConfig = Readonly<BaseConfig>;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
