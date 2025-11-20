package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationTypeAlias_00(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: def.d.ts
export type TypeAlias = { P: number }
// @Filename: ref.ts
import { TypeAlias } from "./def";
const c: T/*ref*/ypeAlias = [|{ P: 2 }|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "ref")
}
