package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxFindAllReferences2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        div: {
            /*1*/name?: string;
            isOpen?: boolean;
        };
        span: { n: string; };
    }
}
var x = <div name="hello" />;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1")
}
