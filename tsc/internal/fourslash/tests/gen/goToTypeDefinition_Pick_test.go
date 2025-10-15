package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinition_Pick(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type User = { id: number; name: string; };
declare const user: Pick<User, "name">
/*reference*/user

type PickedUser = Pick<User, "name">
declare const user2: PickedUser
/*reference2*/user2`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference", "reference2")
}
