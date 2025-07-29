package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteralRelativeImportAllowJSTrue(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: test0.ts
import * as foo1 from ".//*import_as0*/
import * as foo2 from "./f/*import_as1*/
import foo3 = require(".//*import_equals0*/
import foo4 = require("./f/*import_equals1*/
var foo5 = require(".//*require0*/
var foo6 = require("./f/*require1*/
// @Filename: f1.ts

// @Filename: f2.js

// @Filename: f3.d.ts

// @Filename: f4.tsx

// @Filename: f5.js

// @Filename: f6.jsx

// @Filename: g1.ts

// @Filename: g2.js
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
				"f1",
				"f2",
				"f3",
				"f4",
				"f5",
				"f6",
				"g1",
				"g2",
			},
		},
	})
}
