package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImportTypings3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: subdirectory/test0.ts
/// <reference types="m/*types_ref0*/" />
import * as foo1 from "m/*import_as0*/
import foo2 = require("m/*import_equals0*/
var foo3 = require("m/*require0*/
// @Filename: subdirectory/node_modules/@types/module-x/index.d.ts
export var x = 9;
// @Filename: subdirectory/package.json
{ "dependencies": { "@types/module-x": "latest" } }
// @Filename: node_modules/@types/module-y/index.d.ts
export var y = 9;
// @Filename: package.json
{ "dependencies": { "@types/module-y": "latest" } }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"types_ref0", "import_as0", "import_equals0", "require0"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"module-x",
				"module-y",
			},
		},
	})
}
