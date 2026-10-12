package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReferencesImportSource2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext
// @allowJs: true

// @filename: /a.js
export default function /*a*/f() {}

// @filename: /b.ts
import /*b*/f from "./a.js";
f();

// @filename: /c.ts
import source /*c*/f from "/*module*/./a.js";
f;
import.source("./a.js");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "a", "b", "c", "module")
	f.VerifyBaselineRename(t, nil /*preferences*/, "a", "b", "c")
}
