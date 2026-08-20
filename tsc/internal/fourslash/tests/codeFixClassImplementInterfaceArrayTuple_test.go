package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceArrayTuple(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    x: number[];
    y: Array<number>;
    z: [number, string, I];
}

class C implements I {[| |]}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `interface I {
    x: number[];
    y: Array<number>;
    z: [number, string, I];
}

class C implements I {
    x: number[];
    y: number[];
    z: [number, string, I];
}`,
		Index: 0,
	})
}
