package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportVerbatimTypeOnly1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @verbatimModuleSyntax: true
// @Filename: /mod.ts
export const value = 0;
export class C { constructor(v: any) {} }
export interface I {}
// @Filename: /a.mts
const x: /**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "I",
		Source:      "./mod",
		Description: "Add import from \"./mod.js\"",
		AutoImportData: &ls.AutoImportData{
			ExportName:      "I",
			FileName:        "/mod.ts",
			ModuleSpecifier: "./mod.js",
		},
		NewFileContent: PtrTo(`import type { I } from "./mod.js";

const x: `),
	})
	f.Insert(t, "I = new C")
	f.VerifyApplyCodeActionFromCompletion(t, nil, &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "C",
		Source:      "./mod",
		Description: "Update import from \"./mod.js\"",
		AutoImportData: &ls.AutoImportData{
			ExportName:      "C",
			FileName:        "/mod.ts",
			ModuleSpecifier: "./mod.js",
		},
		NewFileContent: PtrTo(`import { C, type I } from "./mod.js";

const x: I = new C`),
	})
}
