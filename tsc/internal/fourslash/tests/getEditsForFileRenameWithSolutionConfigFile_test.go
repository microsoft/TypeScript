package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
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
