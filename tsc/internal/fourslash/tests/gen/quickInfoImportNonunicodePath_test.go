package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoImportNonunicodePath(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /江南今何在/tmp.ts
export const foo = 1;
// @Filename: /test.ts
import { foo } from "./江南/*1*/今何在/tmp";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "module \"/江南今何在/tmp\"", "")
}
