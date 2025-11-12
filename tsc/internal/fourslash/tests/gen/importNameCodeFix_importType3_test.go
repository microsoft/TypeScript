package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_importType3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @module: es2015
// @Filename: /exports.ts
class SomeClass {}
export type { SomeClass };
// @Filename: /a.ts
import {} from "./exports.js";
function takeSomeClass(c: SomeClass/**/)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { type SomeClass } from "./exports.js";
function takeSomeClass(c: SomeClass)`,
	}, nil /*preferences*/)
}
