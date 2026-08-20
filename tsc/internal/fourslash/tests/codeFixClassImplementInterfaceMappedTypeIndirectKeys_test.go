package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMappedTypeIndirectKeys(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Base = { ax: number; ay: string };
type BaseKeys = keyof Base;
type MappedIndirect = { [K in BaseKeys]: boolean };
class MappedImpl implements MappedIndirect { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'MappedIndirect'",
		NewFileContent: `type Base = { ax: number; ay: string };
type BaseKeys = keyof Base;
type MappedIndirect = { [K in BaseKeys]: boolean };
class MappedImpl implements MappedIndirect {
    ax: boolean;
    ay: boolean;
}`,
		Index: 0,
	})
}
