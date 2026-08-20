package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixImportNonExportedMember4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @filename: /a.d.ts
declare function foo(): any;
declare function bar(): any;
// @filename: /b.ts
import { bar } from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.ts")
	f.VerifyCodeFixNotAvailable(t, "fixImportNonExportedMember")
}
