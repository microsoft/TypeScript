package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

// A mapper may emit the same original text in more than one virtual output. Each output is a separate
// source file to the change tracker, but they share an original file, so an edit to a span present in
// both is recorded twice. The two edits describe the same change to the same original range, and applying
// it more than once would corrupt the file, so only one may reach the client.
func TestContentMapperFileRenameAcrossDuplicateProjections(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /dep.ts
export const helper = 1;

// @Filename: /app.astro
import { helper } from "./dep";
helper;
`, contentmappertest.DuplicateProjectionMapper, ".astro")
	defer done()

	f.VerifyWillRenameFilesEdits(t, "/dep.ts", "/renamed.ts", map[string]string{
		"/app.astro": `import { helper } from "./renamed";
helper;
`,
	}, nil)
}
