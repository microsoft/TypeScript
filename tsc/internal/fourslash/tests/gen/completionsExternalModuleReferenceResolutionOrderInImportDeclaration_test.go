package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsExternalModuleReferenceResolutionOrderInImportDeclaration(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file1.ts
export function foo() { };
// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts
declare module "externalModuleRefernceResolutionOrderInImportDeclaration_file1" {
    export function bar();
}
// @Filename: externalModuleRefernceResolutionOrderInImportDeclaration_file3.ts
///<reference path='externalModuleRefernceResolutionOrderInImportDeclaration_file2.ts'/>
import file1 = require('externalModuleRefernceResolutionOrderInImportDeclaration_file1');
/*1*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.Insert(t, "file1.")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"bar",
			},
			Excludes: []string{
				"foo",
			},
		},
	})
}
