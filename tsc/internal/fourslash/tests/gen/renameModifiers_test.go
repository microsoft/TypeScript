package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameModifiers(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|[|declare|] [|abstract|] class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -3 |}C1|] {
    [|[|static|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}a|];|]
    [|[|readonly|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}b|];|]
    [|[|public|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}c|];|]
    [|[|protected|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}d|];|]
    [|[|private|] [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}e|];|]
}|]
[|[|const|] enum [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}E|] {
}|]
[|[|async|] function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -2 |}fn|]() {}|]
[|[|export|] [|default|] class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeDelta": -3 |}C2|] {}|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[2], f.Ranges()[5], f.Ranges()[8], f.Ranges()[11], f.Ranges()[14], f.Ranges()[17], f.Ranges()[20], f.Ranges()[23], f.Ranges()[26], f.Ranges()[27])
}
