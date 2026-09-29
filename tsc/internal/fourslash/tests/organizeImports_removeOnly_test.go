package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports_removeOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { c, b, a } from "foo";
import d, { e } from "bar";
import * as f from "baz";
import { g } from "foo";

export { g, e, b, c };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { c, b } from "foo";
import { e } from "bar";
import { g } from "foo";

export { g, e, b, c };`,
		lsproto.CodeActionKindSourceRemoveUnusedImportsTs,
		nil,
	)
}
