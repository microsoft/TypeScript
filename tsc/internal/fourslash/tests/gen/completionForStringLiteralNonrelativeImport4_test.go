package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: dir1/dir2/dir3/dir4/test0.ts
import * as foo1 from "f/*import_as0*/
import foo4 = require("f/*import_equals0*/
var foo7 = require("f/*require0*/
// @Filename: package.json
{ "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts

// @Filename: dir1/package.json
{ "dependencies": { "fake-module2": "latest" } }
// @Filename: dir1/node_modules/fake-module2/index.ts

// @Filename: dir1/dir2/dir3/package.json
{ "dependencies": { "fake-module3": "latest" } }
// @Filename: dir1/dir2/dir3/node_modules/fake-module3/ts.ts
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
				"fake-module3",
				"fake-module2",
				"fake-module",
			},
		},
	})
}
