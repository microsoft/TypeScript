package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportVerbatimTypeOnly1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @verbatimModuleSyntax: true
// @Filename: /mod.ts
export const value = 0;
export class C { constructor(v: any) {} }
export interface I {}
// @Filename: /a.mts
const x: /**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "I",
		Source:      "./mod",
		Description: "Add import from \"./mod.js\"",
		AutoImportFix: &lsproto.AutoImportFix{
			ModuleSpecifier: "./mod.js",
		},
		NewFileContent: new(`import type { I } from "./mod.js";

const x: `),
	})
	f.Insert(t, "I = new C")
	f.VerifyApplyCodeActionFromCompletion(t, nil, &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "C",
		Source:      "./mod",
		Description: "Update import from \"./mod.js\"",
		AutoImportFix: &lsproto.AutoImportFix{
			ModuleSpecifier: "./mod.js",
		},
		NewFileContent: new(`import { C, type I } from "./mod.js";

const x: I = new C`),
	})
}
