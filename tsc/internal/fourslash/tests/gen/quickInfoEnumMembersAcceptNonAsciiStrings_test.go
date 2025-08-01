package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoEnumMembersAcceptNonAsciiStrings(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `enum Demo {
    /*Emoji*/Emoji = '🍎',
    /*Hebrew*/Hebrew = 'תפוח',
    /*Chinese*/Chinese = '苹果',
    /*Japanese*/Japanese = 'りんご',
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "Emoji", "(enum member) Demo.Emoji = \"🍎\"", "")
	f.VerifyQuickInfoAt(t, "Hebrew", "(enum member) Demo.Hebrew = \"תפוח\"", "")
	f.VerifyQuickInfoAt(t, "Chinese", "(enum member) Demo.Chinese = \"苹果\"", "")
	f.VerifyQuickInfoAt(t, "Japanese", "(enum member) Demo.Japanese = \"りんご\"", "")
}
