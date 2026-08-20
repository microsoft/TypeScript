package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_tsconfig(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./old",
        "paths": {
            "foo": ["old"],
        },
        "rootDir": "old",
        "rootDirs": ["old"],
        "typeRoots": ["old"],
    },
    "files": ["old/a.ts"],
    "include": ["old/*.ts"],
    "exclude": ["old"],
}
// @Filename: /src/old/someFile.ts
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/old", "/src/new", map[string]string{
		"/src/tsconfig.json": `{
    "compilerOptions": {
        "baseUrl": "new",
        "paths": {
            "foo": ["new"],
        },
        "rootDir": "new",
        "rootDirs": ["new"],
        "typeRoots": ["new"],
    },
    "files": ["new/a.ts"],
    "include": ["new/*.ts"],
    "exclude": ["new"],
}`,
	}, nil /*preferences*/)
}
