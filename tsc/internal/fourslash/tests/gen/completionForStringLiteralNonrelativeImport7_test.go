package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport7(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @baseUrl: tests/cases/fourslash/modules
// @Filename: tests/test0.ts
import * as foo1 from "mod/*import_as0*/
import foo2 = require("mod/*import_equals0*/
var foo3 = require("mod/*require0*/
// @Filename: modules/module.ts
export var x = 5;
// @Filename: package.json
{ "dependencies": { "module-from-node": "latest" } }
// @Filename: node_modules/module-from-node/index.ts
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"module",
				"module-from-node",
			},
		},
	})
}
