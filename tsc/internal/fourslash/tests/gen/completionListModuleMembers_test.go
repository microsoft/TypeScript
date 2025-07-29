package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListModuleMembers(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` module Module {
     var innerVariable = 1;
     function innerFunction() { }
     class innerClass { }
     module innerModule { }
     interface innerInterface {}
     export var exportedVariable = 1;
     export function exportedFunction() { }
     export class exportedClass { }
     export module exportedModule { export var exportedInnerModuleVariable = 1; }
     export interface exportedInterface {}
 }

Module./*ValueReference*/;

var x : Module./*TypeReference*/

class TestClass extends Module./*TypeReferenceInExtendsList*/ { }

interface TestInterface implements Module./*TypeReferenceInImplementsList*/ { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ValueReference", "TypeReferenceInExtendsList"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"exportedFunction",
				"exportedVariable",
				"exportedClass",
				"exportedModule",
			},
		},
	})
	f.VerifyCompletions(t, []string{"TypeReference", "TypeReferenceInImplementsList"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"exportedClass",
				"exportedInterface",
			},
		},
	})
}
