package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport8(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./modules",
        "paths": {
            "*": [
                "prefix/0*/suffix.ts",
                "prefix-only/*",
                "*/suffix-only.ts"
            ]
        }
    }
}
// @Filename: tests/test0.ts
import * as foo1 from "f/*import_as0*/
import foo2 = require("f/*import_equals0*/
var foo3 = require("f/*require0*/
import * as foo1 from "f/*import_as1*/
import foo2 = require("f/*import_equals1*/
var foo3 = require("f/*require1*/
import * as foo1 from "f/*import_as2*/
import foo2 = require("f/*import_equals2*/
var foo3 = require("f/*require2*/
// @Filename: modules/prefix/00test/suffix.ts
export var x = 5;
// @Filename: modules/prefix-only/1test.ts
export var y = 5;
// @Filename: modules/2test/suffix-only.ts
export var z = 5;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"2test",
				"prefix",
				"prefix-only",
				"0test",
				"1test",
			},
		},
	})
}
