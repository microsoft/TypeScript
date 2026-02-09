package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports15(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
export const foo = 1;
// @filename: /b.ts
/**
 * Module doc comment
 *
 * @module
 */

// comment 1

// comment 2

import { foo } from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.ts")
	f.VerifyOrganizeImports(t,
		`/**
 * Module doc comment
 *
 * @module
 */

// comment 1

// comment 2

`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
