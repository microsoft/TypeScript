package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinition_typeReference(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type User = { name: string };
type Box<T> = { value: T };
declare const boxedUser: Box<User>
/*reference*/boxedUser`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference")
}
