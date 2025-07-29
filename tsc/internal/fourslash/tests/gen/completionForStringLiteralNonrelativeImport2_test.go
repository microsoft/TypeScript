package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tests/test0.ts
import * as foo1 from "fake-module//*import_as0*/
import foo2 = require("fake-module//*import_equals0*/
var foo3 = require("fake-module//*require0*/
// @Filename: package.json
{ "dependencies": { "fake-module": "latest" }, "devDependencies": { "fake-module-dev": "latest" } }
// @Filename: node_modules/fake-module/repeated.ts
/*repeatedts*/
// @Filename: node_modules/fake-module/repeated.tsx
/*repeatedtsx*/
// @Filename: node_modules/fake-module/repeated.d.ts
/*repeateddts*/
// @Filename: node_modules/fake-module/other.js
/*other*/
// @Filename: node_modules/fake-module/other2.js
/*other2*/
// @Filename: node_modules/unlisted-module/index.js
/*unlisted-module*/
// @Filename: ambient.ts
declare module "fake-module/other"`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"import_as0", "import_equals0", "require0"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"other",
				"repeated",
			},
		},
	})
}
