package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNodeModulesImportCompletions1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @module: node18
// @Filename: /src/module.mts
export {}
// @Filename: /src/module.cts
export {}
// @Filename: /src/module.js
export {}
// @Filename: /src/decl.d.mts
export {}
// @Filename: /src/decl.d.cts
export {}
// @Filename: /src/decl.d.ts
export {}
// @Filename: /src/js.mjs
export {}
// @Filename: /src/js.cjs
export {}
// @Filename: /src/js.js
export {}
// @Filename: /main.mts
import {} from "./src//*1*/";
import mod = require("./src//*2*/");
const m = import("./src//*3*/");
// @Filename: /main.cts
import {} from "./src//*4*/";
import mod = require("./src//*5*/");
const m = import("./src//*6*/");
// @Filename: /main.ts
import {} from "./src//*7*/";
import mod = require("./src//*8*/");
const m = import("./src//*9*/");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "3", "6", "9"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"decl.cjs",
				"decl.mjs",
				"decl.js",
				"js.cjs",
				"js.js",
				"js.mjs",
				"module.cjs",
				"module.js",
				"module.mjs",
			},
		},
	})
	f.VerifyCompletions(t, []string{"2", "4", "5", "7", "8"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"decl.cjs",
				"decl.mjs",
				"decl",
				"js.cjs",
				"js",
				"js.mjs",
				"module.cjs",
				"module",
				"module.mjs",
			},
		},
	})
}
