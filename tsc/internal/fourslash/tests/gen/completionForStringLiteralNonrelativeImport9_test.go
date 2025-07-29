package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport9(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./modules",
        "paths": {
            "module1": ["some/path/whatever.ts"],
            "module2": ["some/other/path.ts"]
        }
    }
}
// @Filename: tests/test0.ts
import * as foo1 from "m/*import_as0*/
import foo2 = require("m/*import_equals0*/
var foo3 = require("m/*require0*/
// @Filename: some/path/whatever.ts
export var x = 9;
// @Filename: some/other/path.ts
export var y = 10;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"module1",
				"module2",
			},
		},
	})
}
