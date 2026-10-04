package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceObjectLiteral(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IPerson {
    coordinate: {
        x: number;
        y: number;
    }
}
class Person implements IPerson { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'IPerson'",
		NewFileContent: `interface IPerson {
    coordinate: {
        x: number;
        y: number;
    }
}
class Person implements IPerson {
    coordinate: { x: number; y: number; };
}`,
		Index: 0,
	})
}
