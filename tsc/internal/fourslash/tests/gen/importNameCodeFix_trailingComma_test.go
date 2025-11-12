package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_trailingComma(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: index.ts
import {
  T2,
  T1,
} from "./types";

const x: T3/**/
// @Filename: types.ts
export type T1 = 0;
export type T2 = 0;
export type T3 = 0;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import {
  T2,
  T1,
  T3,
} from "./types";

const x: T3`,
	}, nil /*preferences*/)
}
