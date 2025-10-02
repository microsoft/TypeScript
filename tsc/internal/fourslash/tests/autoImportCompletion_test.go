package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCompletion1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export const someVar = 10;

// @Filename: b.ts
export const anotherVar = 10;

// @Filename: c.ts
import {someVar} from "./a.ts";
someVar;
a/**/
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &ls.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"someVar", "anotherVar"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}

func TestAutoImportCompletion2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export const someVar = 10;
export const anotherVar = 10;

// @Filename: c.ts
import {someVar} from "./a.ts";
someVar;
a/**/
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &ls.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"someVar", "anotherVar"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}

func TestAutoImportCompletion3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export const aa = "asdf";
export const someVar = 10;
export const bb = 10;

// @Filename: c.ts
import { aa, someVar } from "./a.ts";
someVar;
b/**/
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &ls.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"bb"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}

func TestNodeModulesImportCompletions1Baseline(t *testing.T) {
	t.Parallel()
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
import {} from "./src//*1*/"; //note, this test should not work until packagejsonautoimportprovider is implemented
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
	f.BaselineAutoImportsCompletions(t, []string{"1", "3", "6", "9", "2", "4", "5", "7", "8"})
}
