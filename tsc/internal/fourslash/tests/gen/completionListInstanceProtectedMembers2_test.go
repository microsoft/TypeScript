package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInstanceProtectedMembers2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Base {
    private privateMethod() { }
    private privateProperty;

    protected protectedMethod() { }
    protected protectedProperty;

    public publicMethod() { }
    public publicProperty;

    protected protectedOverriddenMethod() { }
    protected protectedOverriddenProperty;
}

class C1 extends Base {
    protected  protectedOverriddenMethod() { }
    protected  protectedOverriddenProperty;

    test() {
        this./*1*/;
        super./*2*/;

        var b: Base;
        var c: C1;

        b./*3*/;
        c./*4*/;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"protectedMethod",
				"protectedProperty",
				"publicMethod",
				"publicProperty",
				"protectedOverriddenMethod",
				"protectedOverriddenProperty",
			},
			Excludes: []string{
				"privateMethod",
				"privateProperty",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"protectedMethod",
				"publicMethod",
				"protectedOverriddenMethod",
			},
			Excludes: []string{
				"privateMethod",
				"privateProperty",
				"protectedProperty",
				"publicProperty",
				"protectedOverriddenProperty",
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"publicMethod",
				"publicProperty",
			},
			Excludes: []string{
				"privateMethod",
				"privateProperty",
				"protectedMethod",
				"protectedProperty",
				"protectedOverriddenMethod",
				"protectedOverriddenProperty",
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"protectedMethod",
				"protectedProperty",
				"publicMethod",
				"publicProperty",
				"protectedOverriddenMethod",
				"protectedOverriddenProperty",
			},
			Excludes: []string{
				"privateMethod",
				"privateProperty",
			},
		},
	})
}
