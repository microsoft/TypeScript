package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_all2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /path.ts
export declare function join(): void;
// @Filename: /os.ts
export declare function homedir(): void;
// @Filename: /index.ts

join();
homedir();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/index.ts")
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import { homedir } from "./os";
import { join } from "./path";

join();
homedir();`,
	})
}
