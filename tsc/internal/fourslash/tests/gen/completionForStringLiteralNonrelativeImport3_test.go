package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: tests/test0.ts
import * as foo1 from "fake-module//*import_as0*/
import foo2 = require("fake-module//*import_equals0*/
var foo3 = require("fake-module//*require0*/
// @Filename: package.json
{ "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts
/*ts*/
// @Filename: node_modules/fake-module/tsx.tsx
/*tsx*/
// @Filename: node_modules/fake-module/dts.d.ts
/*dts*/
// @Filename: node_modules/fake-module/js.js
/*js*/
// @Filename: node_modules/fake-module/jsx.jsx
/*jsx*/
// @Filename: node_modules/fake-module/repeated.js
/*repeatedjs*/
// @Filename: node_modules/fake-module/repeated.jsx
/*repeatedjsx*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"import_as0", "import_equals0", "require0"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"dts",
				"js",
				"jsx",
				"repeated",
				"ts",
				"tsx",
			},
		},
	})
}
