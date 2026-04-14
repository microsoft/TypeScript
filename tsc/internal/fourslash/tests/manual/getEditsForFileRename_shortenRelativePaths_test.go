package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_shortenRelativePaths(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/foo/x.ts

// @Filename: /src/old.ts
import { x } from "./foo/x";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/old.ts", "/src/foo/new.ts", map[string]string{
		"/src/foo/new.ts": `import { x } from "./x";`,
	}, nil /*preferences*/)
}
