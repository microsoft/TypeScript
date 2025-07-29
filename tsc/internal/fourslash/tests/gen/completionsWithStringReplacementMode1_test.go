package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsWithStringReplacementMode1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface TFunction {
    (_: 'login.title', __?: {}): string;
    (_: 'login.description', __?: {}): string;
    (_: 'login.sendEmailAgree', __?: {}): string;
    (_: 'login.termsOfUse', __?: {}): string;
    (_: 'login.privacyPolicy', __?: {}): string;
    (_: 'login.sendEmailButton', __?: {}): string;
    (_: 'login.emailInputPlaceholder', __?: {}): string;
    (_: 'login.errorWrongEmailTitle', __?: {}): string;
    (_: 'login.errorWrongEmailDescription', __?: {}): string;
    (_: 'login.errorGeneralEmailTitle', __?: {}): string;
    (_: 'login.errorGeneralEmailDescription', __?: {}): string;
    (_: 'login.loginErrorTitle', __?: {}): string;
    (_: 'login.loginErrorDescription', __?: {}): string;
    (_: 'login.openEmailAppErrorTitle', __?: {}): string;
    (_: 'login.openEmailAppErrorDescription', __?: {}): string;
    (_: 'login.openEmailAppErrorConfirm', __?: {}): string;
}
const f: TFunction = (() => {}) as any;
f('[|login./**/|]')`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "login.title",
				},
				&lsproto.CompletionItem{
					Label: "login.description",
				},
				&lsproto.CompletionItem{
					Label: "login.sendEmailAgree",
				},
				&lsproto.CompletionItem{
					Label: "login.termsOfUse",
				},
				&lsproto.CompletionItem{
					Label: "login.privacyPolicy",
				},
				&lsproto.CompletionItem{
					Label: "login.sendEmailButton",
				},
				&lsproto.CompletionItem{
					Label: "login.emailInputPlaceholder",
				},
				&lsproto.CompletionItem{
					Label: "login.errorWrongEmailTitle",
				},
				&lsproto.CompletionItem{
					Label: "login.errorWrongEmailDescription",
				},
				&lsproto.CompletionItem{
					Label: "login.errorGeneralEmailTitle",
				},
				&lsproto.CompletionItem{
					Label: "login.errorGeneralEmailDescription",
				},
				&lsproto.CompletionItem{
					Label: "login.loginErrorTitle",
				},
				&lsproto.CompletionItem{
					Label: "login.loginErrorDescription",
				},
				&lsproto.CompletionItem{
					Label: "login.openEmailAppErrorTitle",
				},
				&lsproto.CompletionItem{
					Label: "login.openEmailAppErrorDescription",
				},
				&lsproto.CompletionItem{
					Label: "login.openEmailAppErrorConfirm",
				},
			},
		},
	})
}
