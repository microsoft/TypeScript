package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRenameWithSolutionConfigFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The parent-directory solution tsconfig only references the composite child
	// project, so when the child file is opened the solution is created as an
	// ancestor project without ever building its program (it stays nil). Renaming
	// a file in the child project must not crash when iterating that nil-program
	// solution project.
	const content = `
// @Filename: /tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./src/tsconfig.json" }
  ]
}

// @Filename: /src/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  },
  "files": ["./a.ts", "./b.ts"]
}

// @Filename: /src/a.ts
import { b } from "./b";
b;

// @Filename: /src/b.ts
export const b = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/b.ts", "/src/c.ts", map[string]string{
		"/src/a.ts": `import { b } from "./c";
b;
`,
	}, nil /*preferences*/)
}

func TestGetEditsForFileRenameLoadsUnopenedCompositeProject(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @stateBaseline: true
// @Filename: /tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./lib" },
    { "path": "./app" }
  ]
}

// @Filename: /lib/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  },
  "files": ["./helper.ts", "./other-helper.ts"]
}

// @Filename: /lib/helper.ts
export const /*helper*/helper = 0;

// @Filename: /lib/other-helper.ts
import { helper } from "./helper";
helper;

// @Filename: /app/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  },
  "files": ["./main.ts"],
  "references": [
    { "path": "../lib" }
  ]
}

// @Filename: /app/main.ts
import { helper } from "../lib/helper";
helper;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "helper")
	result := f.WillRenameFiles(t, &lsproto.FileRename{
		OldUri: string(lsconv.FileNameToDocumentURI("/lib/helper.ts")),
		NewUri: string(lsconv.FileNameToDocumentURI("/lib/renamed-helper.ts")),
	})
	if result.WorkspaceEdit == nil || result.WorkspaceEdit.DocumentChanges == nil {
		t.Fatal("workspace/willRenameFiles returned no document changes")
	}
	for _, change := range *result.WorkspaceEdit.DocumentChanges {
		if change.TextDocumentEdit != nil && change.TextDocumentEdit.TextDocument.Uri.FileName() == "/app/main.ts" {
			for _, edit := range change.TextDocumentEdit.Edits {
				if edit.TextEdit != nil && edit.TextEdit.NewText == "../lib/renamed-helper" {
					return
				}
			}
		}
	}
	t.Fatal("workspace/willRenameFiles returned no import update for /app/main.ts")
}
