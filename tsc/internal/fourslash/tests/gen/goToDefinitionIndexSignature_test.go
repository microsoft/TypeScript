package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionIndexSignature(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    /*defI*/[x: string]: boolean;
}
interface J {
    /*defJ*/[x: string]: number;
}
interface K {
    /*defa*/[x: ` + "`" + `a${string}` + "`" + `]: string;
    /*defb*/[x: ` + "`" + `${string}b` + "`" + `]: string;
}
declare const i: I;
i.[|/*useI*/foo|];
declare const ij: I | J;
ij.[|/*useIJ*/foo|];
declare const k: K;
k.[|/*usea*/a|];
k.[|/*useb*/b|];
k.[|/*useab*/ab|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "useI", "useIJ", "usea", "useb", "useab")
}
