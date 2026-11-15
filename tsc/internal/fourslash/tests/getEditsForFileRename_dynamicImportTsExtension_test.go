package fourslash_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_dynamicImportTsExtension(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "target": "es2022",
        "noEmit": true,
        "allowImportingTsExtensions": true
    },
    "files": ["imported.ts", "loads.ts"]
}
// @Filename: /imported.ts
export const value = 1;
// @Filename: /loads.ts
export const load = () => import("./imported.ts");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	result := f.WillRenameFiles(t, &lsproto.FileRename{
		OldUri: lsconv.FileNameToDocumentURI("/imported.ts"),
		NewUri: lsconv.FileNameToDocumentURI("/sub/moved.ts"),
	})
	if result.WorkspaceEdit == nil || result.WorkspaceEdit.DocumentChanges == nil {
		t.Fatal("workspace/willRenameFiles returned no document changes")
	}

	var loadsEdits []lsproto.TextEditOrAnnotatedTextEditOrSnippetTextEdit
	for _, change := range *result.WorkspaceEdit.DocumentChanges {
		if change.TextDocumentEdit != nil && strings.HasSuffix(string(change.TextDocumentEdit.TextDocument.Uri), "/loads.ts") {
			loadsEdits = change.TextDocumentEdit.Edits
		}
	}
	if len(loadsEdits) != 1 {
		t.Fatalf("expected one edit for loads.ts, got %d", len(loadsEdits))
	}
	if loadsEdits[0].TextEdit == nil || loadsEdits[0].TextEdit.NewText != "./sub/moved.ts" {
		t.Fatalf("expected import to be updated to ./sub/moved.ts, got %#v", loadsEdits[0])
	}
}
