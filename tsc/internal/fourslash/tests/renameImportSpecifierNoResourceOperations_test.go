package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameImportSpecifierNoResourceOperations(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /a.ts
export const x = 0;
// @Filename: /b.ts
import * as a from ".//*rename*/a";`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.Workspace.WorkspaceEdit = &lsproto.WorkspaceEditClientCapabilities{
		DocumentChanges:    new(true),
		ResourceOperations: &[]lsproto.ResourceOperationKind{},
	}
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.GoToMarker(t, "rename")
	f.VerifyRenameFailed(t, nil /*preferences*/)
}
