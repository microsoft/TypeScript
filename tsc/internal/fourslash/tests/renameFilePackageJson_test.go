package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
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
