package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_trailingComma(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import {
  T2,
  T1,
  T3,
} from "./types";

const x: T3`,
	}, nil /*preferences*/)
}
