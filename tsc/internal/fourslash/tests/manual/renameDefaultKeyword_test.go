package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameDefaultKeyword(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @noLib: true
function f(value: string, /*1*/default: string) {}

const /*2*/default = 1;

function /*3*/default() {}

class /*4*/default {}

const foo = {
    /*5*/[|default|]: 1
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	markers := []string{"1", "2", "3", "4"}
	for _, marker := range markers {
		f.GoToMarker(t, marker)
		f.VerifyRenameFailed(t, nil /*preferences*/)
	}

	f.GoToMarker(t, "5")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
}
