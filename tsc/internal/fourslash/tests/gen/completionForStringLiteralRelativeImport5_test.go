package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralRelativeImport5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @rootDirs: /repo/src1,/repo/src2/,/repo/generated1,/repo/generated2/
// @Filename: /dir/secret_file.ts
/*secret_file*/
// @Filename: /repo/src1/dir/test1.ts
import * as foo1 from ".//*import_as1*/
import foo2 = require(".//*import_equals1*/
var foo3 = require(".//*require1*/
// @Filename: /repo/src2/dir/test2.ts
import * as foo1 from "..//*import_as2*/
import foo2 = require("..//*import_equals2*/
var foo3 = require("..//*require2*/
// @Filename: /repo/src2/index.ts
import * as foo1 from ".//*import_as3*/
import foo2 = require(".//*import_equals3*/
var foo3 = require(".//*require3*/
// @Filename: /repo/generated1/dir/f1.ts
/*f1*/
// @Filename: /repo/generated2/dir/f2.ts
/*f2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"import_as1", "import_equals1", "require1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"f1",
				"f2",
				"test2",
			},
		},
	})
	f.VerifyCompletions(t, []string{"import_as2", "import_equals2", "require2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"dir",
				"index",
			},
		},
	})
	f.VerifyCompletions(t, []string{"import_as3", "import_equals3", "require3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"dir",
			},
		},
	})
}
