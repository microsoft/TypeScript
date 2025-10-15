package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeDefinition_arrayType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type User = { name: string };
declare const users: User[]
/*reference*/users

type UsersArr = Array<User>
declare const users2: UsersArr
/*reference2*/users2

class CustomArray<T> extends Array<T> { immutableReverse() { return [...this].reverse() } }
declare const users3: CustomArray<User>
/*reference3*/users3`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToTypeDefinition(t, "reference", "reference2", "reference3")
}
