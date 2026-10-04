package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_tsconfig_include_add(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/tsconfig.json
{
    "include": ["dir"],
}
// @Filename: /src/dir/a.ts
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/dir/a.ts", "/src/newDir/b.ts", map[string]string{
		"/src/tsconfig.json": `{
    "include": ["dir", "newDir/b.ts"],
}`,
	}, nil /*preferences*/)
}
