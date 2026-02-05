package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInScope(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace TestModule {
    var localVariable = "";
    export var exportedVariable = 0;

    function localFunction() { }
    export function exportedFunction() { }

    class localClass { }
    export class exportedClass { }

    interface localInterface {}
    export interface exportedInterface {}

    namespace localModule {
        export var x = 0;
    }
    export namespace exportedModule {
        export var x = 0;
    }

    var v = /*valueReference*/ 0;
    var t :/*typeReference*/;
}

// Add some new items to the module
namespace TestModule {
    var localVariable2 = "";
    export var exportedVariable2 = 0;

    function localFunction2() { }
    export function exportedFunction2() { }

    class localClass2 { }
    export class exportedClass2 { }

    interface localInterface2 {}
    export interface exportedInterface2 {}

    namespace localModule2 {
        export var x = 0;
    }
    export namespace exportedModule2 {
        export var x = 0;
    }
}
var globalVar: string = "";
function globalFunction() { }

class TestClass {
    property: number;
    method() { }
    staticMethod() { }
    testMethod(param: number) {
        var localVar = 0;
        function localFunction() {};
        /*insideMethod*/
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "valueReference", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"localVariable",
				"exportedVariable",
				"localFunction",
				"exportedFunction",
				"localClass",
				"exportedClass",
				"localModule",
				"exportedModule",
				"exportedVariable2",
				"exportedFunction2",
				"exportedClass2",
				"exportedModule2",
			},
		},
	})
	f.VerifyCompletions(t, "typeReference", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"localInterface",
				"exportedInterface",
				"localClass",
				"exportedClass",
				"exportedClass2",
			},
			Excludes: []string{
				"localModule",
				"exportedModule",
				"exportedModule2",
			},
		},
	})
	f.VerifyCompletions(t, "insideMethod", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"globalVar",
				"globalFunction",
				"param",
				"localVar",
				"localFunction",
			},
			Excludes: []string{
				"property",
				"testMethod",
				"staticMethod",
			},
		},
	})
}
