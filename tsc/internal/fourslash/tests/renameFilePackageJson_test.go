package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestRenameFilePackageJson(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/example.ts
import brushPackageJson from './visx-brush//*rename*/package.json';
// @Filename: /src/visx-brush/package.json
{ "name": "brush" }`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "rename", "package2.json", map[string]string{
		"/src/example.ts":               `import brushPackageJson from './visx-brush/package2.json';`,
		"/src/visx-brush/package2.json": `{ "name": "brush" }`,
	})
}

func TestRenameFileEmptyAndDotStems(t *testing.T) {
	t.Parallel()

	for _, fileName := range []string{".ts", "..ts", "...ts", ".d.ts"} {
		t.Run(fileName, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`// @Filename: /src/%s
export declare const value: number;
// @Filename: /src/main.ts
import { value } from ".//*rename*/%s.js";`, fileName, tspath.RemoveFileExtension(fileName))

			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyNoErrors(t)
			extension := ".ts"
			if tspath.IsDeclarationFileName(fileName) {
				extension = ".d.ts"
			}
			f.VerifyRename(t, "rename", "renamed.js", map[string]string{
				"/src/main.ts":             `import { value } from "./renamed.js";`,
				"/src/renamed" + extension: `export declare const value: number;`,
			})
		})
	}
}

func TestRenameFileNewNameIsNormalized(t *testing.T) {
	t.Parallel()

	// The new URI of the file rename is a normalized path. It has no "." segment,
	// no ".." segment, and no empty segment.
	for _, test := range []struct {
		name    string
		newName string
		newURI  lsproto.DocumentUri
	}{
		{name: "dot segment", newName: "./b", newURI: "file:///src/b.ts"},
		{name: "dot dot segment", newName: "x/../b", newURI: "file:///src/b.ts"},
		{name: "empty segment", newName: "x//b", newURI: "file:///src/x/b.ts"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			const content = `// @Filename: /src/a.ts
export {};
// @Filename: /src/main.ts
import ".//*rename*/a";`

			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, "rename")
			result := f.RenameAtCaret(t, test.newName)
			if result.WorkspaceEdit == nil || result.WorkspaceEdit.DocumentChanges == nil {
				t.Fatal("rename returned no document changes")
			}
			for _, change := range *result.WorkspaceEdit.DocumentChanges {
				if change.RenameFile != nil {
					assert.Equal(t, change.RenameFile.NewUri, test.newURI)
					return
				}
			}
			t.Fatal("rename returned no file rename")
		})
	}
}
