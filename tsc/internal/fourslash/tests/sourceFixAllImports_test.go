package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSourceFixAllImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const a: number = 1;
// @Filename: /b.ts
export const b: number = 2;
// @Filename: /main.ts
a;
b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/main.ts")

	// Test per-fixId fix-all via VerifyCodeFixAll (quickfix path)
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import { a } from "./a";
import { b } from "./b";

a;
b;`,
	})
}

func TestSourceFixAllCodeAction(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const a: number = 1;
// @Filename: /b.ts
export const b: number = 2;
// @Filename: /main.ts
a;
b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/main.ts")

	// Test source.fixAll code action directly (on-save path)
	f.VerifySourceFixAll(t, `import { a } from "./a";
import { b } from "./b";

a;
b;`)
}
