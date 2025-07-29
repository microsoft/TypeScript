package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralNonrelativeImport10(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: classic
// @Filename: dir1/dir2/dir3/dir4/test0.ts
import * as foo1 from "f/*import_as0*/
import * as foo3 from "fake-module/*import_as1*/
import foo4 = require("f/*import_equals0*/
import foo6 = require("fake-module/*import_equals1*/
var foo7 = require("f/*require0*/
var foo9 = require("fake-module/*require1*/
// @Filename: package.json
{ "dependencies": { "fake-module": "latest" } }
// @Filename: node_modules/fake-module/ts.ts

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
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
}
