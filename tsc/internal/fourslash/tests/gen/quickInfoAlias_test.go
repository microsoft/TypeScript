package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoAlias(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
/**
 * Doc
 * @tag Tag text
 */
export const x = 0;
// @Filename: /b.ts
import { x } from "./a";
x/*b*/;
// @Filename: /c.ts
/**
 * Doc 2
 * @tag Tag text 2
 */
import {
    /**
     * Doc 3
     * @tag Tag text 3
     */
    x
} from "./a";
x/*c*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
