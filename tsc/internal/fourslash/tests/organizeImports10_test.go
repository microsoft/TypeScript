package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports10(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /module.ts
import type { ZodType } from './declaration';

/** Intended to be used in combination with {@link ZodType} */
export function fun() { /* ... */ }
// @Filename: /declaration.ts
 type ZodType = {};
 export type { ZodType }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import type { ZodType } from './declaration';

/** Intended to be used in combination with {@link ZodType} */
export function fun() { /* ... */ }`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
