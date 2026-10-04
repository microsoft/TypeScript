package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestTsxFindAllReferences1VS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        /*1*/div: {
            name?: string;
            isOpen?: boolean;
        };
        span: { n: string; };
    }
}
var x = /*2*/</*3*/div />;`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineVSFindAllReferences(t, "1", "2", "3")
}
