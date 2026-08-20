package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsFileImportNoTypes2(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /default.ts
export default class TestDefaultClass {}
// @Filename: /defaultType.ts
export default interface TestDefaultInterface {}
// @Filename: /reExport/toReExport.ts
export class TestClassReExport {}
export interface TestInterfaceReExport {}
// @Filename: /reExport/index.ts
export { TestClassReExport, TestInterfaceReExport } from './toReExport';
// @Filename: /exportList.ts
class TestClassExportList {};
interface TestInterfaceExportList {};
export { TestClassExportList, TestInterfaceExportList };
// @Filename: /baseline.ts
export class TestClassBaseline {}
export interface TestInterfaceBaseline {}
// @Filename: /a.js
import /**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "TestClassBaseline",
					InsertText: new("import { TestClassBaseline } from \"./baseline\";"),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./baseline",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:      "TestClassExportList",
					InsertText: new("import { TestClassExportList } from \"./exportList\";"),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./exportList",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:      "TestClassReExport",
					InsertText: new("import { TestClassReExport } from \"./reExport\";"),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./reExport",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:      "TestDefaultClass",
					InsertText: new("import TestDefaultClass from \"./default\";"),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./default",
						},
					},
				},
			},
		},
	})
}
