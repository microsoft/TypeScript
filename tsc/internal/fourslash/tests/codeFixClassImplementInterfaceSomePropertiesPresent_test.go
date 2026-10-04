package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceSomePropertiesPresent(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false

interface I {
    x: number;
    y: number;
    z: number & { __iBrand: any };
}

class C implements I {[|
   |]constructor(public x: number) { }
   y: number;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `
interface I {
    x: number;
    y: number;
    z: number & { __iBrand: any };
}

class C implements I {
   constructor(public x: number) { }
    z: number & { __iBrand: any; };
   y: number;
}`,
		Index: 0,
	})
}
